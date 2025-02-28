import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FormInput = ({ id, label, type = "text", register, required, placeholder }) => (
  <div className="flex flex-col space-y-1.5 mb-2">
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      {...register(id, { required })}
    />
  </div>
);

export default FormInput;