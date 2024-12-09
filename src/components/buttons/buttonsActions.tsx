// import createSurvey, {
//   deleteSurvey,
//   updateSurvey,
//   userSurveys,
//   surveyQuestions,
// } from "@/lib/api/surveyClient";

// export function ButtonActions() {
//   const handleSave = async (updatedSurvey: { id: String; name: String }) => {
//     try {
//       await updateSurvey(updatedSurvey.id, updatedSurvey.name);

//       return true;
//     } catch (error) {
//       console.error("Error when updating the survey", error);
//       return false;
//     }
//   };

//   const handleRead = async (updatedSurvey: {
//     id: string;
//     name: string;
//     question: {
//       name: string;
//       description: String;
//       min: string;
//       max: string;
//       steps: number;
//       surveyId: string;
//     };
//   }) => {
//     try {
//       await userSurveys();
//       return true;
//     } catch (error) {
//       console.error("Error when reading the survey", error);
//       return false;
//     }
//   };

//   const handleDelete = async (
//     surveyId: String,
//     onDeleteSuccess: (deletedSurveyId: String, onDeleteSuccess: String) => void,
//   ) => {
//     try {
//       await deleteSurvey(surveyId);
//       onDeleteSuccess(surveyId, "Success");
//       return true;
//     } catch (error) {
//       console.error("Error when deleting the survey", error);
//       return false;
//     }
//   };

//   const handleQuestionCreated = async (
//     surveyId: String,
//     onQuestionCreated: (
//       createdQuestionId: String,
//       onQuestionCreated: String,
//     ) => void,
//   ) => {
//     try {
//       await surveyQuestions(surveyId);
//       onQuestionCreated(surveyId, "Success");
//       return true;
//     } catch (error) {
//       console.error("Error when creating the question", error);
//       return false;
//     }
//   };

//   return {
//     handleSave,
//     handleDelete,
//     handleRead,
//     handleQuestionCreated,
//   };
// }

// export default ButtonActions;
import {
  createSurvey,
  deleteSurvey,
  updateSurvey,
  userSurveys,
  surveyQuestions,
} from "@/lib/api/surveyClient";
import { toast } from "@/hooks/use-toast";

interface Survey {
  id: string;
  name: string;
}

interface Question {
  name: string;
  description: string;
  min: string;
  max: string;
  steps: number;
  surveyId: string;
}

interface SurveyWithQuestion extends Survey {
  question: Question;
}

export function useButtonActions() {
  const handleSave = async (updatedSurvey: Survey): Promise<boolean> => {
    try {
      await updateSurvey(updatedSurvey.id, updatedSurvey.name);
      toast({
        title: "Umfrage aktualisiert",
        description: "Die Umfrage wurde erfolgreich aktualisiert.",
      });
      return true;
    } catch (error) {
      console.error("Fehler beim Aktualisieren der Umfrage:", error);
      toast({
        title: "Fehler",
        description: "Die Umfrage konnte nicht aktualisiert werden.",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleRead = async (survey: SurveyWithQuestion): Promise<boolean> => {
    try {
      const surveys = await userSurveys();
      // You might want to do something with the surveys data here
      return true;
    } catch (error) {
      console.error("Fehler beim Lesen der Umfragen:", error);
      toast({
        title: "Fehler",
        description: "Die Umfragen konnten nicht geladen werden.",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleDelete = async (
    surveyId: string,
    onDeleteSuccess: (deletedSurveyId: string) => void
  ): Promise<boolean> => {
    try {
      await deleteSurvey(surveyId);
      onDeleteSuccess(surveyId);
      toast({
        title: "Umfrage gelöscht",
        description: "Die Umfrage wurde erfolgreich gelöscht.",
      });
      return true;
    } catch (error) {
      console.error("Fehler beim Löschen der Umfrage:", error);
      toast({
        title: "Fehler",
        description: "Die Umfrage konnte nicht gelöscht werden.",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleQuestionCreated = async (
    surveyId: string,
    onQuestionCreated: (createdQuestionId: string) => void
  ): Promise<boolean> => {
    try {
      const questions = await surveyQuestions(surveyId);
      // Assuming the last question in the array is the newly created one
      const createdQuestion = questions[questions.length - 1];
      onQuestionCreated(createdQuestion.id);
      toast({
        title: "Frage erstellt",
        description: "Die Frage wurde erfolgreich erstellt.",
      });
      return true;
    } catch (error) {
      console.error("Fehler beim Erstellen der Frage:", error);
      toast({
        title: "Fehler",
        description: "Die Frage konnte nicht erstellt werden.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    handleSave,
    handleDelete,
    handleRead,
    handleQuestionCreated,
  };
}

export default useButtonActions;
