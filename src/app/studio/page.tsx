import CreateQuestionForm from "@/components/forms/create-question-form";
import React from "react";
import { useForm } from "@/helper/formHandling";
import { FormProps } from "@/helper/formHandling";

const Studio = ({ setQuestionData, questionData, handleSave }: FormProps) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CreateQuestionForm
        handleSave={handleSave}
        setQuestionData={setQuestionData}
        questionData={questionData}
      />
    </main>
  );
};

export default Studio;
