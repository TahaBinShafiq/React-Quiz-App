import { useEffect, useState } from "react";
import Question from "./questions";

function App() {


  const [timeLeft, setTimeLeft] = useState(() => {
    return Number(localStorage.getItem("timeLeft")) || 180;
  });


  function Timer() {
    useEffect(() => {
      if (timeLeft <= 0) return;

      const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000); // 1 second

      return () => clearInterval(interval); // Cleanup on unmount
    }, [timeLeft]);
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  console.log(timeLeft);


  return (
    <>
      <div className="bg-[#1e1e1e] min-h-screen p-6 font-mono text-gray-200">
        <div className="border-b border-[#3a3a3a] pb-0 flex justify-between items-center mb-2.5">
          <h1
            className="text-3xl font-bold mb-2
                 text-blue-400 tracking-wider"
          >
            Quiz Game
          </h1>
          <div className="text-white font-bold text-2xl">
            Time Left: {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </div>
        </div>

        <div className="bg-[#252525] p-4 rounded-md border border-[#333] ">
          <Question timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
        </div>
      </div>
    </>
  );
}

export default App;
