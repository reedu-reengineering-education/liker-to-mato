import React from "react";
import { CreateSurveyDialog } from "@/components/forms/create-survey-form";
import { ListSurvey } from "@/components/forms/lists/surveyList";

export default function Studio() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="flex">
          <h4 className="text-2xl flex mb-8 font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {"Meine Umfragen "}
          </h4>

          <div className="mt-24">
            <ListSurvey />
          </div>
        </div>
        <div className="flex mb-96">
          <CreateSurveyDialog />
        </div>
      </div>
    </main>
  );
}
