import React, { ChangeEvent, useState } from "react";

import { Button } from "../ui/button";

import { Slider } from "../ui/slider";

import { createAnswer } from "@/lib/api/answerClient";

export function CreateAnswerDialog({
  questionId,
  steps,
  min,
  max,
}: {
  questionId: string;
  steps: number;
  min: string;
  max: string;
}) {
  const [value, setValue] = useState<number>(Number);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const onSubmitCreate = async () => {
    try {
      console.log(value);
      const answerData = await createAnswer(value, questionId);
      console.log("Answer created:", answerData);
      setIsButtonDisabled(true);
    } catch (error) {
      console.error("Error when creating the answer:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex justify-between left-0  ">
        {min}
        <div className="flex justify-between ">{max}</div>
      </div>

      <Slider
        id="value"
        disabled={isButtonDisabled}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setValue(Number(e.target.value))
        }
        className="col-span-3"
        min={1}
        max={steps}
      />

      <Button
        className="flex mt-5 mb-5"
        disabled={isButtonDisabled}
        onClick={() => {
          onSubmitCreate();
        }}
      >
        Submit
      </Button>
    </div>
  );
}

export default CreateAnswerDialog;
