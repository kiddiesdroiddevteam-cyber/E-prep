import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from '@tanstack/react-router';
// import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Sidebar from '@/components/Sidebar';
import Typewriter from '@/components/Typewriter';
import { FadeInFromLeft } from '@/components/FadeInFromLeft';
import { FadeInFromBottom } from '@/components/FadeInFromBottom';
import InfiniteCarousel from '@/components/Carousel';
import LineChart from '@/components/Linechart';
import SchoolIcon from '@mui/icons-material/School';
import Calendar from '@/components/Calendar';

const StatCard: React.FC<{ value: string | number; label: string; icon: string }> = ({ value, label, icon }) => (
  <Card className="p-6 flex items-center justify-center gridBg mr-[10px] w-[170px] max-sm:w-[95vw] min-h-[208px]">
    <div className="flex flex-col justify-between items-center gap-4 h-full">
      <div className="text-4xl">{icon}</div>
      <div>
        <p className="text-[14px] text-[#666666]">{label}</p>
        <p className="text-[24px] font-semibold text-white text-center">{value}</p>
      </div>
    </div>
  </Card>
);

const DashboardPage = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();
  const [prevScores, setPrevScores] = useState<number[]>([])
  const [scoreColor, setScoreColor] = useState("")
  const [prevQuiz, setQuiz] = useState<{
    id: string;
    score: number;
    completed: boolean;
    created_at: string;
    subject: string;
  }[]>([]);
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    streak: 0,
    badges: []
  });

  useEffect(() => {
    if (!user) {
      navigate({to:'/auth'});
      return;
    }

    loadProfile();
    loadStats(); // Call loadStats here to ensure streak is updated on dashboard load
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (data) {
      setProfile(data);
      setStats(prev => ({
        ...prev,
        // Ensure streak is loaded from the profile data
        streak: data.streak_days || 0,
        badges: Array.isArray(data.badges) ? data.badges : []
      }));
    }
  };

  const loadStats = async () => {
    if (!user) return;

    // Load quiz statistics
    const { data: quizzes } = await supabase
      .from('quizzes')
      .select('id, score, completed, created_at, subject') // Select created_at to check quiz completion date
      .eq('user_id', user.id)
      .eq('completed', true)
      .order('created_at', { ascending: false }); // Order by most recent quiz

    const scores = quizzes.map(item => item.score);
    console.log(scores)
    console.log(quizzes, "quizzes")
    setQuiz(quizzes)
    setPrevScores(scores)
    if (quizzes && quizzes.length > 0) {
      const totalScore = quizzes.reduce((sum, quiz) => sum + (quiz.score || 0), 0);
      setStats(prev => ({
        ...prev,
        totalQuizzes: quizzes.length,
        averageScore: Math.round(totalScore / quizzes.length)
      }));

      // Streak Calculation Logic
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize to the start of today

      const mostRecentQuizDate = new Date(quizzes[0].created_at);
      mostRecentQuizDate.setHours(0, 0, 0, 0); // Normalize to the start of the quiz completion day

      let currentStreak = stats.streak; // Start with the existing streak from profile

      // If there's a last_quiz_date in the profile, use it for streak calculation
      let lastQuizDateFromProfile: Date | null = null;
      if (profile?.last_quiz_date) {
        lastQuizDateFromProfile = new Date(profile.last_quiz_date);
        lastQuizDateFromProfile.setHours(0, 0, 0, 0);
      }

      // Check if the most recent quiz was completed today
      const wasQuizCompletedToday = mostRecentQuizDate.getTime() === today.getTime();

      // Check if the most recent quiz was completed yesterday (to continue streak)
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);
      const wasQuizCompletedYesterday = mostRecentQuizDate.getTime() === yesterday.getTime();

      // If a quiz was completed today AND it's a new completion for the day
      if (wasQuizCompletedToday && (!lastQuizDateFromProfile || lastQuizDateFromProfile.getTime() !== today.getTime())) {
        if (lastQuizDateFromProfile && lastQuizDateFromProfile.getTime() === yesterday.getTime()) {
          // If the last quiz was yesterday, increment streak
          currentStreak += 1;
        } else if (!lastQuizDateFromProfile || lastQuizDateFromProfile.getTime() !== today.getTime()) {
          // If no last quiz date or last quiz was not today/yesterday, start a new streak
          currentStreak = 1;
        }
        // Update the profile with the new streak and last_quiz_date
        await supabase
          .from('profiles')
          .update({
            streak_days: currentStreak,
            last_quiz_date: new Date().toISOString()
          })
          .eq('id', user.id);

        setStats(prev => ({ ...prev, streak: currentStreak }));
        setProfile(prev => ({ ...prev, streak_days: currentStreak, last_quiz_date: new Date().toISOString() }));

      } else if (!wasQuizCompletedToday && lastQuizDateFromProfile && lastQuizDateFromProfile.getTime() !== yesterday.getTime()) {
        // If no quiz today, and the last quiz wasn't yesterday, reset the streak
        if (currentStreak > 0) { // Only reset if there was an active streak
          currentStreak = 0;
          await supabase
            .from('profiles')
            .update({ streak_days: currentStreak })
            .eq('id', user.id);
          setStats(prev => ({ ...prev, streak: currentStreak }));
          setProfile(prev => ({ ...prev, streak_days: currentStreak }));
        }
      }
    } else {
      // If no quizzes completed, reset streak to 0 if it's not already
      if (stats.streak > 0) {
        await supabase
          .from('profiles')
          .update({ streak_days: 0 })
          .eq('id', user.id);
        setStats(prev => ({ ...prev, streak: 0 }));
        setProfile(prev => ({ ...prev, streak_days: 0 }));
      }
    }
  };

  const handleStartQuizClick = () => {
      navigate(
        {to: '/quiz'})
  };

  const handleRoute = (quiz) => {
  console.log(quiz?.id);

  navigate({
    to: "/quiz",
    search: {
      quizId: quiz?.id,
    },
  });
};

  const images = [
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpg",
    "/img4.jpg",
    "/img5.jpg"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className=' bg-[#02000D] w-[100vw] overflow-x-hidden'>
      <Sidebar screen={"dashboard"} />
      <div className="max-sm:pt-[90px] bg-gradient-to-b to-transparent via-transparent from-[#0055FF]/10 mx-auto lg:px-4 py-8 space-y-8 lg:pl-[17vw]">
        <div className=' w-full lg:px-[20px] flex items-center justify-between'>
          <div>
            <h1 className="text-[24px] font-bold text-white max-sm:mx-2">Welcome back, <span className=" max-sm:hidden text-white">
              <Typewriter
                texts={[
                  `${profile?.full_name}`,
                  `${profile?.full_name}`,
                ]}
                typingSpeed={100}
                deletingSpeed={50}
                pauseTime={2000}
              />
            </span>
              <span className=" lg:hidden text-white">
                {profile?.full_name}
              </span>
              !</h1>
            <p className="text-gray-400 text-[16px] mt-1 max-sm:mx-2 max-sm:hidden">Let's get some practice in today.</p>
            <p className="text-gray-400 text-lg mt-1 max-sm:mx-2 lg:hidden">
              <Typewriter
                texts={[
                  `Let's get some practice in today.`,
                ]}
                typingSpeed={100}
                deletingSpeed={50}
                pauseTime={2000}
              />
            </p>
          </div>

          <Link to={'/settings'} className=' flex items-center justify-center'>
            <h1 className=' text-white text-[16px] mr-[20px]'>{profile?.full_name}</h1>
            <div className=' h-[54px] w-[54px] rounded-full bg-white'></div>
          </Link>
        </div>

        <div className=' w-full flex flex-col lg:flex-row items-center lg:items-start justify-start lg:justify-between lg:px-[20px]'>
          <div className=' w-[95%] lg:w-[40%]'>
            <FadeInFromLeft>
              <div className=' w-full  h-full flex flex-col items-center justify-start bg-transparent rounded-2xl mb-[10px]'>
                <Card className="p-[15px] text-center homeDash mb-[20px]">
                  <h2 className="text-[24px] font-semibold mb-2 text-white text-left">Start a New Quiz</h2>
                  <p className="text-[#fff] max-w-2xl text-left text-[16px] mx-auto mb-6">Challenge yourself with past questions or let our AI create a custom quiz just for you.</p>
                  <button onClick={handleStartQuizClick} className="!px-10 !py-4 text-[15px] font-semibold w-full h-[41px] bg-white flex items-center justify-center text-black rounded-xl hover:bg-white/60 transition-all duration-500">
                    Let's Go!
                  </button>
                </Card>
              </div>
            </FadeInFromLeft>
          </div>

          <div className=' w-[95%] lg:w-[57%]'>
            <FadeInFromLeft>
              <div className="flex items-center justify-start mb-[10px]">
                {/* <StatCard value={stats?.streak} label="Day Streak" icon="🔥" /> */}
                <StatCard value={stats?.averageScore} label="Avg. Score" icon="🎯" />
                <StatCard value={stats?.badges?.length} label="Badges Earned" icon="🏆" />
                <div className=' gridBg w-[322px] h-[208px] rounded-xl p-[20px]'>
                  <div className="text-4xl">🔥</div>
                  <h1 className=' text-white font-semibold text-[24px]'>You are on a {stats?.streak}-day streak!</h1>
                  <p className=' text-white text-[14px]'>Incredible work! Consistency is the key to success. Keep the flame alive!</p>
                </div>
              </div>
            </FadeInFromLeft>
          </div>

        </div>

        <div className=' w-full flex flex-col lg:flex-row items-center lg:items-start justify-start lg:justify-between lg:px-[20px]'>
          <div className=' w-[28%]'>
            <div className=' w-[100%] rounded-md flex flex-col items-center justify-center bg-gradient-to-b from-transparent via-transparent to-[#0055FF]/10 p-[10px]'>
              <h1 className=' w-full text-left text-[20px] text-white font-semibold'>Progress Chart</h1>
              <p className=' w-full text-left text-white/70'>Track your progress so far 💪🏾</p>
              <LineChart dataPoints={prevScores} />
            </div>
          </div>

          <div className=' w-[70%]'>
            <FadeInFromBottom>
              <div className=' w-full  flex items-start justify-center bg-transparent gridBg rounded-2xl'>
                <Card className="p-6 w-full bg-transparent">
                  <h3 className="text-[18px] font-bold mb-4 text-white border-b border-b-slate-400 pb-[10px]">Your Recent Quizzes</h3>
                  <ul className="space-y-4 h-[320px] overflow-y-scroll">
                    {
                      prevQuiz.map((quiz, index) => {
                        const date = new Date(quiz.created_at);

                        // Format hours and minutes
                        const hours = String(date.getHours()).padStart(2, "0");
                        const minutes = String(date.getMinutes()).padStart(2, "0");

                        // Format day, month, year
                        const day = String(date.getDate()).padStart(2, "0");
                        const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
                        const year = date.getFullYear();

                        const formattedDate = `${hours}:${minutes} ${day}-${month}-${year}`;

                        const getScoreColor = (score) => {
                          if (score >= 70) return '#2ECC71';   // green
                          else if (score >= 60) return '#A3E4D7'; // mint green
                          else if (score >= 50) return '#F39C12'; // yellow
                          else if (score >= 40) return '#D35400'; // orange
                          else return '#E74C3C';               // red
                        };

                        return (
                          <li
  onClick={() => handleRoute(quiz)}
  key={index}
  className="flex cursor-pointer justify-between items-center p-4 bg-transparent rounded-lg"
>
  <div>
    <p className="font-semibold text-white">{quiz.subject}</p>
    <p className="text-sm text-gray-400">Completed at {formattedDate}</p>
  </div>
  <div className="text-right">
    <p className="font-bold" style={{ color: getScoreColor(quiz.score) }}>
                                
      Score: {quiz.score}%
    
                              </p>
  </div>
</li>

                          // <li onClick={handleRoute} key={index} className="flex cursor-pointer justify-between items-center p-4 bg-transparent rounded-lg">
                          //   <div>
                          //     <p className="font-semibold text-white">{quiz.subject}</p>
                          //     <p className="text-sm text-gray-400">Completed at {formattedDate}</p>
                          //   </div>
                          //   <div className="text-right">
                          //     <p className={`font-bold text-green-400 ${quiz.score <= 30 ? "text-red-500" : quiz.score <= 60 ? "text-amber-500" : quiz.score > 60 && "text-green-500"}`}>Score: {quiz.score}%</p>
                          //   </div>
                          // </li>
                        )
                      })
                    }
                    {/* <li className="flex justify-between items-center p-4 bg-transparent rounded-lg">
                      <div>
                        <p className="font-semibold text-black">Quiz: Photosynthesis</p>
                        <p className="text-sm text-gray-400">Completed 2 hours ago</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-400">Score: 85%</p>
                      </div>
                    </li>
                    <li className="flex justify-between items-center p-4 bg-transparent rounded-lg">
                      <div>
                        <p className="font-semibold text-black">Quiz: Algebra</p>
                        <p className="text-sm text-gray-400">Completed yesterday</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-yellow-400">Score: 60%</p>
                      </div>
                    </li> */}
                  </ul>
                </Card>
              </div>
            </FadeInFromBottom>
          </div>
        </div>

        {/*  */}

        {/* <div>
          <InfiniteCarousel />
        </div> */}
      </div>
    </div>
  );
};

export default DashboardPage;