"use client";

import React from "react";
import { type UseFormReturn } from "react-hook-form";

type Props = {
  label: string;
  id: string;
  formObj: UseFormReturn;
};

export default function RadioInput(props: Props) {
  const { label, id, formObj } = props;
  const { register } = formObj;

  return (
    <div className="form-check">
      <input
        id={id}
        type="checkbox"
        className="form-check-input"
        {...register(id)}
      />
      <label htmlFor={id} className="form-check-label">
        {label}
      </label>
    </div>
  );
}
