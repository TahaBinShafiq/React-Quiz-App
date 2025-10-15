import { useState } from "react"
import Button from "./Button"

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


        function showQuest() {
            console.log(questions)
        }

    ])
    return (
        <>
            <p>Hello</p>
            <Button />
        </>
    )
}

export default Question