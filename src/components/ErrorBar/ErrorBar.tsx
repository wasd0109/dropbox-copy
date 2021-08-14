import React from "react";
import { ErrorBarProps } from "./ErrorBarType";

function ErrorBar({ message }: ErrorBarProps) {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-1 py-1 rounded relative"
      role="alert"
    >
      <p>{message}</p>
    </div>
  );
}

export default ErrorBar;
