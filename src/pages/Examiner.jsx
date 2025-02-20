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
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const Examiner = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { register, control, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: {
      text: "",
      answers: [{ text: "", isCorrect: false }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "answers",
  });

  useEffect(() => {
    fetch("https://localhost:7261/api/Question", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const questionsWithAnswers = data.map((question) => ({
          ...question,
          answers: question.answers || [],
        }));
        setQuestions(questionsWithAnswers);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const onSubmit = async (data) => {
    console.log("Submitting data:", data);
    if (editIndex !== null) {
      const questionId = questions[editIndex].id;
      try {
        const response = await fetch(
          `https://localhost:7261/api/Question/${questionId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
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
    reset({ text: "", answers: [{ text: "", isCorrect: false }] });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    const questionToEdit = questions[index];
    reset(questionToEdit);
  };

  const handleDelete = async () => {
    if (deleteIndex === null) return;
    const questionId = questions[deleteIndex].id;
    try {
      const response = await fetch(
        `https://localhost:7261/api/Question/${questionId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const updatedQuestions = questions.filter((_, i) => i !== deleteIndex);
        setQuestions(updatedQuestions);
        setDeleteIndex(null);
        setIsDialogOpen(false);
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

      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-[500px] mb-8 mt-[50px]">
          <Card>
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
                    <Label htmlFor="text">Question</Label>
                    <Input
                      id="text"
                      placeholder="Input your question"
                      {...register("text", { required: true })}
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
                          {...register(`answers.${index}.text`, {
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
                          className="hover:bg-red-700 hover:text-white"
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
                      onClick={() => append({ text: "", isCorrect: false })}
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
        </div>

        <div className="w-full max-w-[800px]">
          <Card>
            <CardHeader>
              <CardTitle>Questions List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table className="w-full min-w-[600px]">
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
                        <TableRow key={index} className="">
                          <TableCell className="">
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
                              className="m-2 hover:bg-yellow-400 "
                              variant="outline"
                              onClick={() => handleEdit(index)}
                            >
                              Edit
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="ml-2 hover:bg-red-700 hover:text-white"
                                  onClick={() => {
                                    setDeleteIndex(index);
                                    setIsDialogOpen(true);
                                  }}
                                >
                                  Delete
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Confirm Deletion
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this
                                    question? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel
                                    onClick={() => setIsDialogOpen(false)}
                                  >
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction onClick={handleDelete}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan="3" className="text-center pt-5">
                          No sets of quizzes are available yet.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Examiner;
