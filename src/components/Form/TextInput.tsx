"use client";

import React from "react";
import { type UseFormReturn } from "react-hook-form";

type Props = {
  label: string;
  id: string;
  required?: boolean;
  formObj: UseFormReturn;
  type?: string;
};

export default function TextInput(props: Props) {
  const { label, id, required, formObj, type } = props;
  const {
    register,
    formState: { errors },
  } = formObj;

  const inputType = type || "text";

  const validations = {} as any;
  if (type === "url") {
    validations["pattern"] = { value: /^http/, message: "must be url" };
  }

  if (required) {
    validations["required"] = { value: true, message: `${label} is required.` };

    return (
      <>
        <label htmlFor={id} className="form-label">
          {label}
        </label>
        <input
          id={id}
          className="form-control"
          type={inputType}
          {...register(id, validations)}
        />

        {errors[id] && <p className="text-danger">{errors[id]?.message}</p>}
      </>
    );
  }

  return (
    <>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        id={id}
        className="form-control"
        type={inputType}
        {...register(id, validations)}
      />
    </>
  );
}
