import React from 'react';
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const AnswerOption = ({ index, register, watch, setValue, remove }) => {
  const handleCorrectAnswerChange = () => {
    const answers = watch("answers");
    answers.forEach((answer, i) => {
      setValue(`answers.${i}.isCorrect`, i === index);
    });
  };

  return (
    <div className="flex items-center space-x-2 mb-2">
      <Input
        placeholder="Input answer choice"
        {...register(`answers.${index}.text`, { required: true })}
      />
      <Checkbox
        checked={watch(`answers.${index}.isCorrect`)}
        onCheckedChange={handleCorrectAnswerChange}
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
  );
};

export default AnswerOption;