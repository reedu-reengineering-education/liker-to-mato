import createSurvey, {
  deleteSurvey,
  updateSurvey,
  userSurveys,
  surveyQuestions,
} from "@/lib/api/surveyClient";

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
    onDeleteSuccess: (deletedSurveyId: String, onDeleteSuccess: String) => void,
  ) => {
    try {
      await deleteSurvey(surveyId);
      onDeleteSuccess(surveyId, "Success");
      return true;
    } catch (error) {
      console.error("Error when deleting the survey", error);
      return false;
    }
  };

  const handleQuestionCreated = async (
    surveyId: String,
    onQuestionCreated: (
      createdQuestionId: String,
      onQuestionCreated: String,
    ) => void,
  ) => {
    try {
      await surveyQuestions(surveyId);
      onQuestionCreated(surveyId, "Success");
      return true;
    } catch (error) {
      console.error("Error when creating the question", error);
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

export default ButtonActions;
