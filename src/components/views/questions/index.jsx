import { useEffect, useState } from "react"
import Button from "./button"


function Question() {
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
            options: [
                "Steven Spielberg",
                "James Cameron",
                "Quentin Tarantino",
            ],

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
            options: [
                "Charles Dickens",
                "Leo Tolstoy",
                "Jane Austen",
            ],
        },
    ])

    let [incQuestion, setIncQuestion] = useState(0)
    let [options, setOptions] = useState([])
    let [score, setScore] = useState(0)
    let [selectedAnswer, setSelectedAnswer] = useState(null);
    let [startQuiz, setStartQuiz] = useState(false)
    const [totalQuestions, setTotalQuestions] = useState(10);

    useEffect(() => {
        if (questions[incQuestion]) {
            const allOptions = [...questions[incQuestion].options, questions[incQuestion].correct_answer]
            const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
            setOptions(shuffledOptions)
        }
    }, [incQuestion, questions])

    function handleSelect(answer) {
        setSelectedAnswer(answer);
    }

    function nextQues() {
        if (selectedAnswer === questions[incQuestion].correct_answer) {
            setScore((prev) => prev + 1)
        }
        setIncQuestion(prev => prev + 1);
        setSelectedAnswer(null);
    }


    return (
        <>

            {!startQuiz ? (
                <div>

                    <p>Total Question is 10</p>

                    <div onClick={() => setStartQuiz(true)}>
                        <Button text="Start Quiz" />
                    </div>
                </div>
            ) :

                <>

                    {/* Show Question and Complete Quiz  */}
                    {incQuestion < questions.length ?
                        <p id={questions[incQuestion].id}>
                            <span>({questions[incQuestion].id}/10)</span>
                            {questions[incQuestion].question}
                        </p> : (
                            <>
                                <p>Quiz Complete</p>
                            </>
                        )

                    }


                    {/* Show Options  */}
                    {incQuestion < questions.length ?
                        <div >
                            {options.map((opt, i) => {
                                return (
                                    <div className="options" key={i} onClick={() => handleSelect(opt)}>
                                        <p className="singleOpt">{opt}</p>
                                    </div>
                                )
                            })}
                        </div> : <>
                            <p>Your Score is {score}/10</p>
                            <p>{score <= 5 ? "Keep practicing!" : "Nice job!"}</p>
                        </>
                    }

                    {/* button  */}

                    <div onClick={incQuestion > 9 ? () => {
                        setStartQuiz(true);
                        setIncQuestion(0);
                        setScore(0);
                        setSelectedAnswer(null);
                    }
                        : selectedAnswer ? nextQues : undefined}
                        style={{
                            opacity: selectedAnswer || incQuestion > 9 ? 1 : 0.5,
                            pointerEvents: selectedAnswer || incQuestion > 9 ? 'auto' : 'none',
                            cursor: selectedAnswer || incQuestion > 9 ? 'pointer' : 'not-allowed',
                        }}>
                        <button>{incQuestion > 9 ? "Restart Quiz" : "Next"}</button>
                    </div>
                </>
            }

        </>
    )
}

export default Question