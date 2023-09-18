import axios from "axios";

async function createSurveyData(name: String, userId: String) {
  const apiUrl = `/api/survey/index.ts`; // API-Endpunkt für das Erstellen

  try {
    const response = await axios.post(apiUrl, { name, userId });
    const surveyData = response.data;
    return surveyData;
  } catch (error) {
    console.error("Fehler beim Erstellen der Umfrage:", error);
    throw error;
  }
}

export default createSurveyData;
