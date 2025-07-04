import { AlertCircleIcon } from "lucide-react";

import { Alert, AlertTitle } from "@/components/ui/alert";

import type { ApiError } from "../api/errors";

export function LoginAlert({ error }: { error: ApiError }) {
  let message;
  switch (error.body.code) {
    case "InvalidCreds":
      message = "Invalid username or password.";
      break;
    default:
      message = "Generic Error.";
      break;
  }

  return (
    <Alert variant="destructive" className="mb-2 [&>svg]:size-5">
      <AlertCircleIcon />
      <AlertTitle className="text-base">{message}</AlertTitle>
    </Alert>
  );
}
