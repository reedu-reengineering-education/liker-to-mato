import React from "react";

import { CreateSurveyDialog } from "@/components/forms/create-survey-form";

export function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CreateSurveyDialog />
    </main>
  );
}
export default Home;
