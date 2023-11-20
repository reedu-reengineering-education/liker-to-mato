"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Delete, PlusIcon } from "lucide-react";
import CreateSurveyDialog from "../create-survey-form";
import { useSession } from "next-auth/react";
import { ListSurvey } from "./surveyList";

export function UserSettingsForm() {
  return (
    <main>
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h4 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {"Meine Umfragen "}
          </h4>
        </div>
        <div className="flex items-center">
          {/* Button zum Erstellen einer neuen Umfrage */}
          <CreateSurveyDialog />
        </div>
      </div>
      <div>
        <ListSurvey />
      </div>
    </main>
  );
}
