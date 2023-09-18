import axios from "axios";

// Eine Funktion, um GET-Anfragen durchzuführen
export async function getSurveyData(surveyId: any) {
  const apiUrl = `/api/survey/${surveyId}`;

  try {
    const response = await axios.get(apiUrl);
    const surveyData = response.data;
    return surveyData;
  } catch (error) {
    console.error("Fehler beim Abrufen der Umfrage:", error);
    throw error;
  }
}

// Eine Funktion, um PUT-Anfragen durchzuführen
export async function updateSurveyData(surveyId: any, name: any, userId: any) {
  const apiUrl = `/api/survey/${surveyId}`;

  try {
    const response = await axios.put(apiUrl, { name, userId });
    const updatedSurveyData = response.data;
    return updatedSurveyData;
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Umfrage:", error);
    throw error;
  }
}

// Eine Funktion, um DELETE-Anfragen durchzuführen
export async function deleteSurveyData(surveyId: any) {
  const apiUrl = `/api/survey/${surveyId}`;

  try {
    await axios.delete(apiUrl);
    console.log("Umfrage gelöscht");
  } catch (error) {
    console.error("Fehler beim Löschen der Umfrage:", error);
    throw error;
  }
}
