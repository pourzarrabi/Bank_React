import React from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { authFormSchema } from "@/lib/utils";

const formSchema = authFormSchema("sign-up");

interface CustomInput {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
}

const CustomInput = ({ control, name, label, placeholder }: CustomInput) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className='form-item'>
          <FormLabel className='form-label mb-2' htmlFor={name}>
            {label}:
          </FormLabel>
          <div className='flex flex-col w-full'>
            <FormControl>
              <Input
                id={name}
                placeholder={placeholder}
                type={name === "password" ? "password" : "text"}
                className='input-class'
                {...field}
              />
            </FormControl>
            <FormMessage className='form-message mt-1' />
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
