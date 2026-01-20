import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { v4 as uuidv4 } from 'uuid';
import QuizSetup from '../components/quiz/QuizSetup';
import QuizPlayer from '../components/quiz/QuizPlayer';
import QuizResults from '../components/quiz/QuizResults';
import { Quiz, QuizSettings, UserAnswer, QuizResult, QuizMode, Question } from '../types';
import { transformQuestions } from '@/helper/transformQuestions';
import { quizRoute } from '@/router';
import { generateQuizQuestionsFromPdf, generateQuizQuestionsFromTopic } from '../services/geminiService'; // Assuming you put both functions here
import LoaderIcon from '../components/icons/LoaderIcon';
import { fetchAlocQuestions } from '../services/alocApiService';
import { supabase } from '../integrations/supabase/client';

type QuizFlowState = 'setup' | 'loading' | 'playing' | 'results';

interface QuizFlowPageProps {
  onBackToDashboard: () => void;
}

const QuizFlowPage: React.FC<QuizFlowPageProps> = ({ onBackToDashboard }) => {
  const [flowState, setFlowState] = useState<QuizFlowState>('setup');
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
 const { quizId } = quizRoute.useSearch();
// const quizId = searchParams.get("quizId");

const handleLoadHistory = async (quizAttemptId: string) => {
  try {
    // Get user once
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) throw new Error("User not authenticated");

    const userId = userData.user.id;

    // 1. Fetch attempt data
    const { data: attempt, error: attemptError } = await supabase
      .from<any, any>("quiz_attempts")
      .select("*")
      .eq("quiz_id", quizAttemptId)
      .eq("user_id", userId)
      .single();

    if (attemptError) throw attemptError;

    // 2. Fetch result data
    const { data: resultData, error: resultError } = await supabase
      .from<any, any>("quiz_results")
      .select("*")
      .eq("quiz_id", quizAttemptId)   // <-- FIXED (results table should reference attempt_id)
      .eq("user_id", userId)
      .single();

    if (resultError) throw resultError;

    console.log(attempt, "fetched attempt");
    console.log(resultData, "fetched result");

    // 3. Rehydrate result
    const rehydratedResult: QuizResult = {
      score: resultData.score,
      answers: resultData.answers,
      topicPerformance: resultData.topic_performance
    };

    // 4. Rehydrate quiz
    const rehydratedQuiz = {
      questions: attempt.questions,
      settings: {
        mode: attempt.mode,
        selectedSubject: attempt.subject,
        examType: attempt.exam,
        numQuestions: attempt.total_questions
      }
    };

    console.log(rehydratedQuiz, "rehydratedQuiz");
    console.log(rehydratedResult, "rehydratedResult");

    // 5. Update context
    setCurrentQuiz(rehydratedQuiz);
    setQuizResult(rehydratedResult);

    // 6. Navigate
    setFlowState("results");

  } catch (error) {
    console.error("Error loading history:", error);
    alert("Could not load quiz details.");
  }
};


  const handleStartQuiz = useCallback(async (settings: QuizSettings) => {
    setFlowState('loading');
    setError(null);
    try {
      let questions: Question[] = [];

      if (settings.mode === QuizMode.PAST_QUESTIONS) {
          console.log(settings, 'settings in past questions');
        // questions = await fetchPastQuestions(settings.topic.id, settings.numQuestions);
              const fetchedQuestions = await fetchAlocQuestions({
          subject: settings.selectedSubject,
          year: parseInt(settings.selectedYear, 10),
          type: settings.selectedExamType
        });
        console.log(fetchedQuestions, 'fetchedQuestions');
  const transformed = transformQuestions(fetchedQuestions);
  console.log(transformed, 'transformed');
  questions = transformed.questions.map(q => ({
    ...q,
    topicId: settings.id
  }));

      } else if (settings.mode === QuizMode.AI_GENERATED) {
        if (!settings.topic) {
          throw new Error("Topic not provided for AI generated quiz.");
        }
        const generatedQuestions = await generateQuizQuestionsFromTopic(settings.topic, settings.numQuestions);
        console.log(generatedQuestions, 'generatedQuestions from gemini (topic)');
        questions = generatedQuestions?.map(q => ({
          ...q,
          id: uuidv4(),
          topicId: settings.topic!.id // Use non-null assertion as we checked for !settings.topic
        } as Question));

      } else if (settings.mode === QuizMode.PDF_UPLOAD) {
        if (!settings.pdfContentId) {
          throw new Error("PDF content ID not provided for PDF upload quiz.");
        }
        // Here, generateQuizQuestionsFromPdf should internally fetch the PDF content
        // based on the pdfContentId from your backend, or the backend might
        // have already returned the full text in the initial upload response
        // which could then be passed here. For simplicity, assume generateQuizQuestionsFromPdf
        // takes the ID and handles fetching.
        console.log(settings, 'pdfContentId in quiz flow');
        const generatedQuestions = await generateQuizQuestionsFromPdf(settings.pdfExtractedText, settings.numQuestions);
        console.log(generatedQuestions, 'generatedQuestions from gemini (pdf)');
        questions = generatedQuestions?.map(q => ({
          ...q,
          id: uuidv4(),
          topicId: settings.pdfContentId // Using PDF content ID as topicId for consistency
        } as Question));
      }

      if (questions.length === 0) {
        throw new Error(`No questions could be generated for the selected criteria.`);
      }

      if (questions.length < settings.numQuestions) {
        console.warn(`Requested ${settings.numQuestions} questions but only found/generated ${questions.length}.`);
      }

      const newQuiz: Quiz = {
        id: uuidv4(),
        settings,
        questions,
      };
      setCurrentQuiz(newQuiz);
      setFlowState('playing');
    } catch (err: any) {
      console.error("Error starting quiz:", err);
      setError(err.message || 'An unexpected error occurred while starting the quiz.');
      setFlowState('setup');
    }
  }, []);

  const handleSubmitQuiz = useCallback(async (answers: UserAnswer[]) => {
    if (!currentQuiz) return;
    console.log(currentQuiz, 'currentQuiz on submit');
    console.log(answers, 'answers on submit');
    const correctAnswers = answers.filter(a => a.isCorrect).length;
    const score = Math.round((correctAnswers / currentQuiz.questions.length) * 100);

    const result: QuizResult = {
      score,
      answers,
      topicPerformance: [{
        // Adjust topicName based on quiz mode for better reporting
        topicName: currentQuiz.settings.mode === QuizMode.PAST_QUESTIONS
          ? currentQuiz.settings.selectedSubject!
          : currentQuiz.settings.mode === QuizMode.AI_GENERATED
            ? currentQuiz.settings.topic!.name
            : 'PDF Uploaded Content', // Default for PDF_UPLOAD
        correct: correctAnswers,
        total: currentQuiz.questions.length
      }]
    };

    setQuizResult(result);
    let subjectNameForDB: string;
    let examTypeForDB: string = "ai"; // Default for AI/PDF generated
    let modeForDB: string = 'ai_generated'; // Default for AI/PDF generated

    if (currentQuiz.settings.mode === QuizMode.PAST_QUESTIONS) {
      subjectNameForDB = currentQuiz.settings.selectedSubject!;
      examTypeForDB = currentQuiz.settings.selectedExamType!.toLowerCase();
      modeForDB = 'past';
    } else if (currentQuiz.settings.mode === QuizMode.AI_GENERATED) {
      subjectNameForDB = currentQuiz.settings.topic!.name;
      examTypeForDB = 'ai';
    } else { // QuizMode.PDF_UPLOAD
      subjectNameForDB = `PDF-${currentQuiz.settings.pdfContentId?.substring(0, 8)}`; // Use a truncated ID
      modeForDB = 'pdf_upload';
    }

    try {
      const user = (await supabase.auth.getUser()).data.user;

if (!user) {
  throw new Error("User not authenticated");
}

// 1. Insert into quizzes table
const { data: quizData, error: quizError } = await supabase
  .from('quizzes')
  .insert({
    user_id: user.id,
    mode: modeForDB,
    subject: subjectNameForDB,
    exam: examTypeForDB,
    score: score,
    question_ids: [],
    total_questions: currentQuiz.questions.length,
    completed: true,
    time_limit_seconds: currentQuiz.settings.numQuestions * 60,
    created_at: new Date().toISOString(),
    completed_at: new Date().toISOString()
  })
  .select()
  .single(); // Use .single() to get one object instead of an array

if (quizError) throw quizError;

// Capturing the ID from the first insert
const newQuizId = quizData.id;

// 2. Insert into quiz_attempts table (Linking via quiz_id)
const { data: attemptData, error: attemptError } = await supabase
  .from('quiz_attempts')
  .insert({
    quiz_id: newQuizId, // <--- Linked here
    user_id: user.id,
    mode: modeForDB,
    subject: subjectNameForDB,
    exam: examTypeForDB,
    score: score,
    questions: currentQuiz.questions,
    total_questions: currentQuiz.questions.length,
    completed: true,
    time_limit_seconds: currentQuiz.settings.numQuestions * 60,
    created_at: new Date().toISOString(),
    completed_at: new Date().toISOString()
  })
  .select();

if (attemptError) throw attemptError;

// 3. Insert into quiz_results table (Linking via quiz_id)
const { data: resulttData, error: resultError } = await supabase
  .from('quiz_results')
  .insert({
    quiz_id: newQuizId, // <--- Linked here
    user_id: user.id,
    score: result?.score,
    answers: result?.answers,
    topic_performance: result?.topicPerformance
  })
  .select();

if (resultError) throw resultError;

console.log("✅ Quiz inserted:", quizData);
console.log("✅ Attempt inserted:", attemptData);
console.log("✅ Attempt inserted:", resulttData);

setFlowState("results");
    }
    catch (err) {
      console.error('Error submitting quiz:', err);
      setError('Failed to save quiz results. Please try again.');
      setFlowState('results'); // Still show results, but indicate save failure
    }
  }, [currentQuiz]);

  const handleRestart = useCallback(() => {
    if (currentQuiz) {
      setFlowState('playing');
    }
  }, [currentQuiz]);

  const handleNewQuiz = useCallback(() => {
    setCurrentQuiz(null);
    setQuizResult(null);
    setFlowState('setup');
  }, []);

  const handleBackToDashboard = () => {
    navigate({to: '/dashboard'});
  }

  const renderContent = () => {
    switch (flowState) {
      case 'setup':
        return <QuizSetup onStartQuiz={handleStartQuiz} />;
      case 'loading':
        return (
          <div className="flex flex-col items-center justify-center h-96">
            <LoaderIcon className="w-16 h-16 animate-spin text-[#0055FF]" />
            <p className="mt-4 text-xl text-gray-700">Generating your quiz...</p>
          </div>
        );
      case 'playing':
        return currentQuiz && <QuizPlayer quiz={currentQuiz} onSubmit={handleSubmitQuiz} />;
      case 'results':
        return currentQuiz && quizResult && <QuizResults quiz={currentQuiz} result={quizResult} onRestart={handleRestart} onNewQuiz={handleNewQuiz} />;
      default:
        return <QuizSetup onStartQuiz={handleStartQuiz} />;
    }
  };

  useEffect(() => {
  if (quizId) {
    handleLoadHistory(quizId);
  }
}, [quizId]);
  return (
    <div className=" bg-gradient-to-b to-transparent via-transparent from-[#0055FF]/10">
      {flowState !== 'setup' && (
        <button onClick={handleBackToDashboard} className="mb-6 text-[#0055FF] hover:text-[#0055FF]/60 transition-colors">
          &larr; Back to Dashboard
        </button>
      )}
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {renderContent()}
    </div>
  );
};

export default QuizFlowPage;