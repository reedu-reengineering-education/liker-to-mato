import axios from "axios";

export async function readSurvey(surveyId: any) {
  const apiUrl = `/api/survey/${surveyId}`;

  try {
    const response = await axios.get(apiUrl);
    const getSurvey = response.data;
    return getSurvey;
  } catch (error) {
    console.error("Error when requesting the survey:", error);
    throw error;
  }
}

export async function updateSurvey(
  surveyId: String,
  name: String,
  userId: String
) {
  const apiUrl = `/api/survey/${surveyId}`;

  try {
    const response = await axios.put(apiUrl, { name, userId });
    const updatedSurvey = response.data;
    return updatedSurvey;
  } catch (error) {
    console.error("Error when updating the survey:", error);
    throw error;
  }
}

export async function deleteSurvey(surveyId: any) {
  const apiUrl = `/api/survey/${surveyId}`;

  try {
    await axios.delete(apiUrl);
    console.log("Survey deleted");
  } catch (error) {
    console.error("Error when deleting the survey:", error);
    throw error;
  }
}
