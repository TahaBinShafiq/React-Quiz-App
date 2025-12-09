import { useState, useEffect } from "react";
import Question from "./questions";
import handleConfetti from "./cofetti";

function App() {
  
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = Number(localStorage.getItem("timeLeft"));
    return saved > 0 ? saved : 120;
  });

  const [startQuiz, setStartQuiz] = useState(() => {
    return localStorage.getItem("startQuiz") === "true" || false;
  });

  const [incQuestion, setIncQuestion] = useState(
    () => Number(localStorage.getItem("incQuestion")) || 0
  );

  const [score, setScore] = useState(
    () => Number(localStorage.getItem("score")) || 0
  );
  const isQuizOver = incQuestion >= 10 || timeLeft <= 0;

  useEffect(() => {
    localStorage.setItem("startQuiz", startQuiz);
  }, [startQuiz]);


  useEffect(() => {
    if (isQuizOver) {
      localStorage.setItem("quizCompleted", true);
    }
  }, [isQuizOver]);

  const [confettiLaunched, setConfettiLaunched] = useState(false);
  useEffect(() => {
    if (score >= 5 && !confettiLaunched && isQuizOver) {
      handleConfetti();
      setConfettiLaunched(true);
    }
  }, [score, confettiLaunched, isQuizOver]);

  // Timer
  useEffect(() => {
    if (!startQuiz || isQuizOver) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        localStorage.setItem("timeLeft", newTime);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [startQuiz, isQuizOver]); // depend only on startQuiz

  useEffect(() => {
    // Agar quiz already completed nahi hai aur timer 0 ho gaya
    const quizAlreadyCompleted = JSON.parse(
      localStorage.getItem("quizCompleted")
    );
    if (!quizAlreadyCompleted && timeLeft <= 0) {
      setStartQuiz(false); // stop quiz
      localStorage.setItem("quizCompleted", true);
    }
  }, [timeLeft]);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-[#1e1e1e] min-h-screen p-6 font-mono text-gray-200">
      <div className="border-b border-[#3a3a3a] pb-2 flex justify-between items-center mb-3">
        <h1 className="text-3xl font-bold text-blue-400 tracking-wider">
          Quiz Game
        </h1>
        <div className="text-white font-bold text-2xl">
          Time Left: {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </div>
      </div>

      <div className="bg-[#252525] p-4 rounded-md border border-[#333]">
        <Question
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          startQuiz={startQuiz}
          setStartQuiz={setStartQuiz}
          incQuestion={incQuestion}
          setIncQuestion={setIncQuestion}
          score={score}
          setScore={setScore}
        />
      </div>
    </div>
  );
}

export default App;
