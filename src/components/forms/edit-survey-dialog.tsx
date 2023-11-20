import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { updateSurvey } from "@/lib/api/surveyClient";
import { Survey } from "@prisma/client";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export async function EditSurveyForm({
  survey,
  onSave,
}: {
  survey: Survey;
  onSave: (survey: Survey) => void;
}) {
  const [name, setName] = useState(survey.name);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onSave({ ...survey, name });
  };

  return (
    <div>
      <Card>
        <CardContent onSubmit={handleSubmit}>
          <Label>
            Umfragename:
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Label>
          <Button type="submit">Speichern</Button>
        </CardContent>
      </Card>
    </div>
  );
}
