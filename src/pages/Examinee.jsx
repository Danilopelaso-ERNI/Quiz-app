import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Examinee = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answered, setAnswered] = useState(false);  
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    fetch("https://localhost:7261/api/Question")
      .then((response) => response.json())
      .then((data) => {
        const questionsWithAnswers = data.map((question) => ({
          ...question,
          answers: question.answers || [],
        }));
        setQuestions(questionsWithAnswers);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

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
    <>  
      <Navbar />

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
              {questions.length > 0 ? (
                <>
                  <p className="text-center pt-2 font-regular text-[15px]">
                    {questions[currentQuestion].text}
                  </p>
                  {questions[currentQuestion].answers.map((option, index) => (
                    <Button
                      onClick={() =>
                        handleAnswerOption(index, option.isCorrect)
                      }
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
                      {option.text}
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
                </>
              ) : (
                <p className="text-center p-3">Loading quizzes...</p>
              )}
            </CardContent>
          )}
          {!showScore && (
            <CardDescription className="text-center mb-3">
              <p>
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </CardDescription>
          )}
        </Card>
      </div>
    </>
  );
};

export default Examinee;
