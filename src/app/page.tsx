import React from "react";
import { CreateAccount } from "@/components/forms/log-in-form";
import { CreateSurveyDialog } from "@/components/forms/create-survey-form";

export function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CreateAccount />
      <CreateSurveyDialog />
    </main>
  );
}
export default Home;
