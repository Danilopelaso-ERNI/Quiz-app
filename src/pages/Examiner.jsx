import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Navbar from "../components/Navbar";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import FormInput from "../components/FormInput";
import AnswerOption from "../components/AnswerOption";
import CustomTable from "../components/CustomTable";
import ConfirmationModal from "../components/ConfirmationModal";
import { useAuth } from "../AuthContext";

const Examiner = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
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
    const fetchQuestions = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("https://localhost:7261/api/Question", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const questionsWithAnswers = data.map((question) => ({
          ...question,
          answers: question.answers || [],
        }));
        setQuestions(questionsWithAnswers);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    if (isAuthenticated) {
      fetchQuestions();
    }
  }, [isAuthenticated]);

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");

    if (editIndex !== null) {
      const questionId = questions[editIndex].id;
      try {
        const response = await fetch(
          `https://localhost:7261/api/Question/${questionId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
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
            Authorization: `Bearer ${token}`,
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
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://localhost:7261/api/Question/${questionId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
                  <FormInput
                    id="text"
                    label="Question"
                    placeholder="Input your question"
                    register={register}
                    required
                  />
                  <div className="flex flex-col space-y-1.5 mb-4">
                    <Label>Answer Options</Label>
                    {fields.map((field, index) => (
                      <AnswerOption
                        key={field.id}
                        index={index}
                        register={register}
                        watch={watch}
                        setValue={setValue}
                        remove={remove}
                      />
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
                <div className="flex justify-center">
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
                <CustomTable
                  data={questions}
                  onEdit={handleEdit}
                  onDelete={(index) => {
                    setDeleteIndex(index);
                    setIsDialogOpen(true);
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        description="Are you sure you want to delete this question? This action cannot be undone."
      />
    </>
  );
};

export default Examiner;
