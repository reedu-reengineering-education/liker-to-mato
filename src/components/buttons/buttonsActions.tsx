"use client";
import React from "react";
import { useState, useEffect } from "react";
import {
  deleteSurvey,
  updateSurvey,
  userSurveys,
  readSurvey,
} from "@/lib/api/surveyClient";
import SurveyId from "@/pages/api/survey/[surveyId]";

export function ButtonActions() {
  const handleSave = async (updatedSurvey: { id: String; name: String }) => {
    try {
      await updateSurvey(updatedSurvey.id, updatedSurvey.name);

      return true;
    } catch (error) {
      console.error("Error when updating the survey", error);
      return false;
    }
  };

  const handleRead = async (updatedSurvey: {
    id: string;
    name: string;
    question: {
      name: string;
      description: String;
      min: string;
      max: string;
      steps: number;
      surveyId: string;
    };
  }) => {
    try {
      await userSurveys();
      return true;
    } catch (error) {
      console.error("Error when reading the survey", error);
      return false;
    }
  };

  const handleDelete = async (
    surveyId: String,
    onDeleteSuccess: (deletedSurveyId: String, onDeleteSuccess: String) => void
  ) => {
    try {
      await deleteSurvey(surveyId);
      onDeleteSuccess(surveyId, "Success"); // Pass both surveyId and a string as arguments

      return true;
    } catch (error) {
      console.error("Error when deleting the survey", error);
      return false;
    }
  };

  // const handleCreateNewQuestion = async (
  //   surveyId: String,
  //   onCreateSuccess: (createdQuestionId: String) => void
  // ) => {
  //   try {
  //     await readSurvey(surveyId);
  //     onCreateSuccess(surveyId);
  //     return true;
  //   } catch (error) {
  //     console.error("Error when creating the question", error);
  //     return false;
  //   }
  // };

  return { handleSave, handleDelete, handleRead };
}

export default ButtonActions;
