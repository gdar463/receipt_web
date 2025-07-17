import { Link, createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_landing/")({
  component: Index,
});

function Index() {
  return (
    <div className="font-parkinsans pt-48">
      <div className="flex flex-col space-y-4 mx-auto max-w-1/2 text-center">
        <div className="font-semibold text-pretty text-7xl/tight text-transparent bg-clip-text bg-gradient-to-br from-foreground via-foreground to-foreground-95% ">
          Tracker for all your receipts
        </div>
        <div className="font-extralight text-2xl/relaxed">
          Save and Filter all of your transactions
        </div>
        <div className="font-inter flex space mt-1 mx-auto space-x-8">
          <Button
            className="text-xl h-12 w-30 rounded-md px-6 has-[>svg]:px-4"
            asChild
          >
            <Link to="/auth/signup">Sign Up</Link>
          </Button>
          <Button
            variant="secondary"
            className="text-xl h-12 w-30 rounded-md has-[>svg]:px-4"
            asChild
          >
            <Link to="/auth/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
