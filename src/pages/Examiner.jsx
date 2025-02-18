import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Examiner = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const { register, control, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: {
      question: "",
      answers: [{ answer: "", isCorrect: false }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "answers",
  });

  useEffect(() => {
    // Fetch questions from the API
    fetch("https://localhost:7261/api/Question")
      .then((response) => response.json())
      .then((data) => {
        // Ensure each question has an answers property
        const questionsWithAnswers = data.map((question) => ({
          ...question,
          answers: question.answers || [],
        }));
        setQuestions(questionsWithAnswers);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const onSubmit = async (data) => {
    if (editIndex !== null) {
      // Update existing question
      const questionId = questions[editIndex].id;
      try {
        const response = await fetch(`https://localhost:7261/api/Question/${questionId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          const updatedQuestions = [...questions];
          updatedQuestions[editIndex] = { ...data, id: questionId };
          setQuestions(updatedQuestions);
          setEditIndex(null);
        } else {
          console.error("Error updating question:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating question:", error);
      }
    } else {
      // Create new question
      try {
        const response = await fetch("https://localhost:7261/api/Question", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          const newQuestion = await response.json();
          setQuestions([...questions, newQuestion]);
        } else {
          console.error("Error creating question:", response.statusText);
        }
      } catch (error) {
        console.error("Error creating question:", error);
      }
    }
    reset({ question: "", answers: [{ answer: "", isCorrect: false }] });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    const questionToEdit = questions[index];
    reset(questionToEdit);
  };

  const handleDelete = async (index) => {
    const questionId = questions[index].id;
    try {
      const response = await fetch(`https://localhost:7261/api/Question/${questionId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
      } else {
        console.error("Error deleting question:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleCorrectAnswerChange = (index) => {
    const answers = watch("answers");
    answers.forEach((answer, i) => {
      setValue(`answers.${i}.isCorrect`, i === index);
    });
  };

  const handleLogoutClick = () => {
    navigate("/home");
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <Card className="w-[500px] mb-4">
            <CardHeader>
              <CardTitle>Create Question</CardTitle>
              <CardDescription>
                Create your set of questions here!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5 mb-2">
                    <Label htmlFor="question">Question</Label>
                    <Input
                      id="question"
                      placeholder="Input your question"
                      {...register("question", { required: true })}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5 mb-4">
                    <Label>Answer Options</Label>
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <Input
                          placeholder="Input answer choice"
                          {...register(`answers.${index}.answer`, {
                            required: true,
                          })}
                        />
                        <Checkbox
                          checked={watch(`answers.${index}.isCorrect`)}
                          onCheckedChange={() =>
                            handleCorrectAnswerChange(index)
                          }
                        />
                        <Button
                          variant="outline"
                          type="button"
                          onClick={() => remove(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      className="mt-4"
                      variant="outline"
                      type="button"
                      onClick={() => append({ answer: "", isCorrect: false })}
                    >
                      Add Answer
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button onClick={handleLogoutClick} variant="outline">
                    Go back
                  </Button>
                  <Button type="submit">
                    {editIndex !== null ? "Update" : "Submit"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          <Card className="w-[800px]">
            <CardHeader>
              <CardTitle className="">Questions List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table className="w-full text-center">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Question</TableHead>
                    <TableHead className="text-center">Answers</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {questions && questions.length > 0 ? (
                    questions.map((q, index) => (
                      <TableRow key={index} className="text-center">
                        <TableCell className="text-center">
                          {q.text}
                        </TableCell>
                        <TableCell className="text-center">
                          <ul>
                            {q.answers && q.answers.length > 0 ? (
                              q.answers.map((a, i) => (
                                <li
                                  key={i}
                                  className={a.isCorrect ? "font-bold" : ""}
                                >
                                  {a.text}
                                </li>
                              ))
                            ) : (
                              <li>No answers available.</li>
                            )}
                          </ul>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="outline"
                            onClick={() => handleEdit(index)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            className="ml-2"
                            onClick={() => handleDelete(index)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan="3" className="text-center">
                        No questions available.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Examiner;