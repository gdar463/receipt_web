import { AlertCircleIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import type { ApiError } from "../api/errors";

export function SignupAlert({ error }: { error: ApiError }) {
  let title, message;
  switch (error.body.code) {
    case "UserAlreadyExists":
      title = "Username and/or email is not available.";
      message = "Use another one.";
      break;
    default:
      title = "Generic Error.";
      message = "Check the browser console for more information.";
      break;
  }

  return (
    <Alert variant="destructive" className="mb-2 [&>svg]:size-5">
      <AlertCircleIcon />
      <AlertTitle className="text-base">{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
