"use client";
import React, { useEffect, useState } from "react";
import { userSurveys, updateSurvey } from "@/lib/api/surveyClient";
import { Survey } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  PencilIcon,
  ShareIcon,
  CodeBracketIcon,
  QrCodeIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { EditSurveyForm } from "../edit-survey-dialog";

function ListSurvey() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [editingSurvey, setEditingSurvey] = useState(null);

  useEffect(() => {
    userSurveys()
      .then(setSurveys)
      .catch((error) => console.error(error));
  }, []);

  const handleSave = async (updatedSurvey: Survey) => {
    try {
      await updateSurvey(updatedSurvey.id, updatedSurvey.name);
      setSurveys(
        surveys.map((s) => (s.id === updatedSurvey.id ? updatedSurvey : s))
      );
      setEditingSurvey(null);
    } catch (error) {
      console.error("Error when updating the survey", error);
    }
  };

  return (
    <div>
      {surveys.map((survey) => (
        <div key={survey.id} className="mt-4 p-4 shadow rounded-lg bg-white">
          <p className="text-lg font-semibold">{survey.name}</p>
          <div className="flex space-x-2 mt-3">
            <Button variant="outline" onClick={() => setEditingSurvey(null)}>
              <PencilIcon className="mr-1.5 h-5 w-5" aria-hidden="true" />
              Edit
            </Button>
            <Button variant="outline">
              <ShareIcon className="mr-1.5 h-5 w-5" aria-hidden="true" />
              Share
            </Button>
            <Button variant="outline">
              <CodeBracketIcon className="mr-1.5 h-5 w-5" aria-hidden="true" />
              Embed
            </Button>
            <Button variant="outline">
              <QrCodeIcon className="mr-1.5 h-5 w-5" aria-hidden="true" />
              QR Code
            </Button>
            <Button variant="destructive">
              <TrashIcon className="mr-1.5 h-5 w-5" aria-hidden="true" />
              Delete
            </Button>
          </div>
        </div>
      ))}
      {editingSurvey && (
        <EditSurveyForm survey={editingSurvey} onSave={handleSave} />
      )}
    </div>
  );
}

export { ListSurvey };
