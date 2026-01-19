import React, { useState, useEffect } from 'react';
import { Quiz, UserAnswer } from '../../types';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface QuizPlayerProps {
  quiz: Quiz;
  onSubmit: (answers: UserAnswer[]) => void;
}

const QuizPlayer: React.FC<QuizPlayerProps> = ({ quiz, onSubmit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Map<string, number>>(new Map());
  const [timeLeft, setTimeLeft] = useState(quiz.questions.length * 60); // 60 seconds per question

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev > 0) {
          return prev - 1;
        } else {
          handleSubmit(); // Call handleSubmit when time is 0
          clearInterval(timer); // Stop the timer
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerSelect = (choiceIndex: number) => {
    const newAnswers = new Map(userAnswers);
    newAnswers.set(quiz.questions[currentQuestionIndex].id, choiceIndex);
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    const finalAnswers: UserAnswer[] = quiz.questions.map(q => {
        const answer = userAnswers.get(q.id);
        return {
            questionId: q.id,
            question: q.prompt,
            answer: answer ?? -1,
            isCorrect: answer === q.answer
        }
    });
    onSubmit(finalAnswers);
  };
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const selectedAnswer = userAnswers.get(currentQuestion.id);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto p-6 md:p-8 bg-[#02000D] gridBg">
        <div className="flex justify-between items-center mb-6">
            <div>
                <span className="text-[#0055FF]" onClick={()=> console.log(currentQuestion)}>{quiz.settings.mode}</span>
                {
                  quiz.settings.mode === "Past Questions" ? 
                  <h2 className="text-2xl font-bold text-white">{quiz.settings?.selectedSubject}</h2>:
                  <h2 className="text-2xl font-bold text-white"></h2>
                }
            </div>
            <div className="text-right">
                <div className="text-lg font-semibold text-[#0055FF]">{formatTime(timeLeft)}</div>
                <div className="text-sm text-gray-400">Time Left</div>
            </div>
        </div>

        <div className="mb-6">
            <p className="text-gray-400 mb-2">Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
            <h3 className="text-2xl font-semibold text-white">{currentQuestion.prompt}</h3>
            {currentQuestion?.imageUrl && (
                <div>
                    <img src={currentQuestion?.imageUrl} alt="Question Image" className="max-w-full h-auto rounded-lg"/>
                </div>
            )}
        </div>
        
        <div className="space-y-4 mb-8">
            {currentQuestion.choices.map((choice, index) => (
                <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full text-left p-4 border-2 rounded-lg transition-all text-lg text-white ${
                        selectedAnswer === index
                        ? 'border-[#0055FF]'
                        : 'border-brand-border hover:border-[#0055FF]'
                    }`}
                >
                    <span className={`font-mono mr-4 ${selectedAnswer === index ? 'text-[#0055FF]' : 'text-white'}`}>{String.fromCharCode(65 + index)}</span>
                    {choice}
                </button>
            ))}
        </div>

        <div className="flex justify-between items-center">
            <Button variant="primary" onClick={handlePrev} disabled={currentQuestionIndex === 0}>
                Previous
            </Button>
            {currentQuestionIndex === quiz.questions.length - 1 ? (
                 <Button onClick={handleSubmit}>Submit Quiz</Button>
            ): (
                <Button onClick={handleNext}>
                    Next
                </Button>
            )}
        </div>
        <div className="w-full bg-brand-surface rounded-full h-2.5 mt-6">
            <div className="bg-[#0055FF] h-2.5 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}></div>
        </div>
    </Card>
  );
};

export default QuizPlayer;
