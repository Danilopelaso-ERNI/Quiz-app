import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const questions = [
  {
    questionText: "What is the capital of France?",
    answerOptions: [
      { answerText: "New York", isCorrect: false },
      { answerText: "London", isCorrect: false },
      { answerText: "Paris", isCorrect: true },
      { answerText: "Dublin", isCorrect: false },
    ],
  },
  {
    questionText: "Who is the CEO of Tesla?",
    answerOptions: [
      { answerText: "Jeff Bezos", isCorrect: false },
      { answerText: "Elon Musk", isCorrect: true },
      { answerText: "Bill Gates", isCorrect: false },
      { answerText: "Tony Stark", isCorrect: false },
    ],
  },
  {
    questionText: "What is the largest planet in our solar system?",
    answerOptions: [
      { answerText: "Earth", isCorrect: false },
      { answerText: "Jupiter", isCorrect: true },
      { answerText: "Mars", isCorrect: false },
      { answerText: "Saturn", isCorrect: false },
    ],
  },
  {
    questionText: 'Which element has the chemical symbol "O"?',
    answerOptions: [
      { answerText: "Gold", isCorrect: false },
      { answerText: "Oxygen", isCorrect: true },
      { answerText: "Osmium", isCorrect: false },
      { answerText: "Hydrogen", isCorrect: false },
    ],
  },
  {
    questionText: "What is the smallest prime number?",
    answerOptions: [
      { answerText: "0", isCorrect: false },
      { answerText: "1", isCorrect: false },
      { answerText: "2", isCorrect: true },
      { answerText: "3", isCorrect: false },
    ],
  },
];

const Examiner = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const nextQuestion = () => {
    if (answered) {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setAnswered(false);
        setSelectedAnswer(null);
      } else {
        setShowScore(true);
      }
    }
  };

  const handleAnswerOption = (index, isCorrect) => {
    setAnswered(true);
    setSelectedAnswer(index);
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center font-bold">Quiz App</CardTitle>
        </CardHeader>
        {showScore ? (
          <CardContent className="flex items-center justify-center flex-col space-y-2">
            <Badge className="py-1 px-5 text-[15px] rounded-2xl">
              You Scored {score} out of {questions.length}
            </Badge>
          </CardContent>
        ) : (
          <CardContent className="flex item-center flex-col justify-center space-y-2">
            <p className="text-center pt-2 font-regular text-[15px]">
              {questions[currentQuestion].questionText}
            </p>
            {questions[currentQuestion].answerOptions.map((option, index) => (
              <Button
                onClick={() => handleAnswerOption(index, option.isCorrect)}
                variant="outline"
                key={index}
                className={`w-full ${
                  answered
                    ? option.isCorrect
                      ? "bg-[#77B254] text-white"
                      : selectedAnswer === index
                      ? "bg-[#BE3144] text-white"
                      : ""
                    : ""
                }`}
              >
                {option.answerText}
              </Button>
            ))}
            <div className="">
              <Button
                onClick={nextQuestion}
                className={`w-full`}
                disabled={!answered}
              >
                Next Question
              </Button>
            </div>
          </CardContent>
        )}
        {/* Conditionally render the CardDescription only if showScore is false */}
        {!showScore && (
          <CardDescription className="text-center mb-3">
            <p>
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </CardDescription>
        )}
      </Card>
    </div>
  );
};

export default Examiner;
