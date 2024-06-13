"use client";

import { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

type FormSubmitButtonProps = PropsWithChildren<{
  pendingLabel?: string;
  className?: string;
}> &
  ComponentPropsWithoutRef<"button">;

export default function FormSubmitButton({
  children,
  pendingLabel,
  className,
  ...props
}: FormSubmitButtonProps) {
  const { pending } = useFormStatus();

  let text = children;
  if (pendingLabel && pending) text = pendingLabel;

  return (
    <button
      {...props}
      type="submit"
      disabled={pending}
      className={`${className} btn btn-primary`}
    >
      {text}
      {pending && <span className="loading loading-spinner" />}
    </button>
  );
}
