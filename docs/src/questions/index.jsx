import { useEffect, useState } from "react";

function Question({ timeLeft , setTimeLeft}) {
  

  const [questions, setQuestions] = useState([
    {
      id: 1,
      category: "General Knowledge",
      question: "What is the capital city of France?",
      correct_answer: "Paris",
      options: ["London", "Berlin", "Madrid"],
    },

    {
      id: 2,
      category: "Science",
      question: "What planet is known as the Red Planet?",
      correct_answer: "Mars",
      options: ["Venus", "Jupiter", "Saturn"],
    },

    {
      id: 3,
      category: "Technology",
      question: "What does HTML stand for?",
      correct_answer: "HyperText Markup Language",
      options: [
        "HighText Machine Language",
        "Hyper Tool Multi Language",
        "Hyper Transfer Markup Language",
      ],
    },
    {
      id: 4,
      category: "Sports",
      question: "Which country won the FIFA World Cup in 2018?",
      correct_answer: "France",
      options: ["Brazil", "Germany", "Argentina"],
    },

    {
      id: 5,
      category: "Mathematics",
      question: "What is the value of π (Pi) rounded to two decimal places?",
      correct_answer: "3.14",
      options: ["3.12", "3.16", "3.18"],
    },

    {
      id: 6,
      category: "Geography",
      question: "Which is the largest ocean on Earth?",
      correct_answer: "Pacific Ocean",
      options: ["Indian Ocean", "Arctic Ocean", "Atlantic Ocean"],
    },

    {
      id: 7,
      category: "Entertainment",
      question: "Who directed the movie 'Inception'?",
      correct_answer: "Christopher Nolan",
      options: ["Steven Spielberg", "James Cameron", "Quentin Tarantino"],
    },

    {
      id: 8,
      category: "History",
      question: "In which year did World War II end?",
      correct_answer: "1945",
      options: ["1942", "1944", "1948"],
    },

    {
      id: 9,
      category: "Programming",
      question: "Which of the following is a JavaScript framework?",
      correct_answer: "React",
      options: ["Laravel", "Django", "Flask"],
    },

    {
      id: 10,
      category: "Literature",
      question: "Who wrote 'Romeo and Juliet'?",
      correct_answer: "William Shakespeare",
      options: ["Charles Dickens", "Leo Tolstoy", "Jane Austen"],
    },
  ]);

  const [incQuestion, setIncQuestion] = useState(() => {
    return Number(localStorage.getItem("incQuestion")) || 0;
  });

  const [score, setScore] = useState(() => {
    return Number(localStorage.getItem("score")) || 0;
  });

  const [userAnswers, setUserAnswers] = useState(() => {
    const saved = localStorage.getItem("userAnswers");
    return saved ? JSON.parse(saved) : [];
  });

  const [startQuiz, setStartQuiz] = useState(() => {
    return localStorage.getItem("startQuiz") === "true" || false;
  });
  let [options, setOptions] = useState([]);
  let [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(
    () => localStorage.setItem("incQuestion", incQuestion),
    [incQuestion]
  );
  useEffect(() => localStorage.setItem("score", score), [score]);
  useEffect(
    () => localStorage.setItem("userAnswers", JSON.stringify(userAnswers)),
    [userAnswers]
  );
  useEffect(() => localStorage.setItem("startQuiz", startQuiz), [startQuiz]);

  useEffect(() => {
    if (questions[incQuestion]) {
      const allOptions = [
        ...questions[incQuestion].options,
        questions[incQuestion].correct_answer,
      ];
      const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
      setOptions(shuffledOptions);
    }
  }, [incQuestion, questions]);


   useEffect(() => {
    if (!startQuiz || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [startQuiz, timeLeft, setTimeLeft]);

  function handleSelect(answer) {
    setSelectedAnswer(answer);

    setUserAnswers((prev) => {
      const exists = prev.find(
        (q) => q.question === questions[incQuestion].question
      );
      if (exists) {
        return prev.map((q) =>
          q.question === questions[incQuestion].question
            ? { ...q, selected: answer }
            : q
        );
      }
      return [
        ...prev,
        {
          question: questions[incQuestion].question,
          correct: questions[incQuestion].correct_answer,
          selected: answer,
        },
      ];
    });
  }

  function nextQues() {
    if (selectedAnswer === questions[incQuestion].correct_answer) {
      setScore((prev) => prev + 1);
    }
    setIncQuestion((prev) => prev + 1);
    setSelectedAnswer(null);
  }

  console.log(score);

  const isQuizOver = incQuestion >= questions.length || timeLeft <= 0;

  function restartQuiz() {
    setIncQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setStartQuiz(false);
    setTimeLeft(180);

    localStorage.removeItem("incQuestion");
    localStorage.removeItem("score"); 
    localStorage.removeItem("userAnswers");
    localStorage.removeItem("startQuiz");
    localStorage.removeItem("timeLeft")
  }

  return (
    <>
    <div className="min-h-[80vh] bg-[#1e1e1e] text-gray-200 font-mono p-6">
      {!startQuiz && (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <h1 className="text-3xl font-bold text-purple-400 mb-4">Welcome to the Quiz</h1>
          <p className="text-lg mb-2">
            Total Questions: <span className="text-yellow-300 font-bold">10</span>
          </p>
          <p className="text-lg mb-6">
            Passing Ratio: <span className="text-green-400 font-bold">50%</span>
          </p>
          <button
            onClick={() => {
              setStartQuiz(true);
              setTimeLeft(180);
              localStorage.setItem("startQuiz", true);
              localStorage.setItem("timeLeft", 180);
            }}
            className="px-6 py-3 rounded-sm font-bold bg-blue-600 text-gray-100 hover:bg-blue-700 transition-all"
          >
            Start Quiz →
          </button>
        </div>
      )}

      {startQuiz && (
        <div>

          {isQuizOver ? (
            <div className="mt-6">
              <h2 className="text-2xl font-bold text-purple-400 mb-4">Quiz Complete</h2>
              <p className="text-lg mb-1">Your Score: <span className="text-green-400 font-bold">{score}/10</span></p>
              <p className="text-lg mb-1">Your Percentage: <span className="text-green-400 font-bold">{(score / 10) * 100}%</span></p>
              <p className="text-lg mb-6">
                {score >= 8 ? (
                  <span className="text-green-400 font-bold">Excellent! You passed 🎉</span>
                ) : score >= 5 ? (
                  <span className="text-yellow-400 font-bold">Good! You passed 🙂</span>
                ) : (
                  <span className="text-red-600 font-bold">Don't worry, you can improve! Review the material and try again.</span>
                )}
              </p>

              <div className="space-y-4">
                {userAnswers.map((item, index) => (
                  <div key={index} className="p-4 bg-[#2a2a2a] border border-[#3a3a3a] rounded-md font-mono">
                    <p className="text-yellow-300 font-semibold">Q{index + 1}: {item.question}</p>
                    <p className="text-green-400 mt-1">✓ Correct: {questions[index].correct_answer}</p>
                    <p className={`mt-1 ${item.selected === item.correct ? "text-green-300" : "text-red-400"}`}>
                      • Your Answer: {item.selected}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 w-fit mx-auto">
                <button onClick={restartQuiz} className="px-6 py-2 rounded-sm font-bold bg-green-600 text-gray-100 hover:bg-green-700 transition-all">
                  Restart Quiz
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Options */}
              <div className="flex flex-col gap-3">
                {options.map((opt, i) => (
                  <div
                    key={i}
                    onClick={() => handleSelect(opt)}
                    className={`px-4 py-3 text-md cursor-pointer border border-[#3a3a3a] rounded-sm transition-all ${
                      selectedAnswer === opt
                        ? "bg-[#1E1E1E] text-white"
                        : "bg-[#2d2d2d] text-green-400 hover:bg-[#333]"
                    }`}
                  >
                    {opt}
                  </div>
                ))}
              </div>

              {/* Next Button */}
              <div className="mt-6 w-fit mx-auto">
                <div
                  onClick={selectedAnswer ? nextQues : undefined}
                  style={{
                    opacity: selectedAnswer ? 1 : 0.4,
                    pointerEvents: selectedAnswer ? "auto" : "none",
                    cursor: selectedAnswer ? "pointer" : "not-allowed",
                  }}
                >
                  <button className="px-6 py-2 rounded-sm font-bold bg-blue-600 text-gray-100 hover:bg-blue-700 transition-all">
                    Next →
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>

    </>
  );
}

export default Question;
