import axios from "axios";

// Eine Funktion, um POST-Anfragen für das Erstellen von Fragen durchzuführen
async function createQuestionData(
  name: string,
  description: string,
  min: string,
  steps: number,
  max: string,
  surveyId: string
) {
  const apiUrl = "/api/question/index.ts"; // API-Endpunkt für das Erstellen von Fragen

  try {
    const response = await axios.post(apiUrl, {
      name,
      description,
      min,
      steps,
      max,
      surveyId,
    });
    const questionData = response.data;
    return questionData;
  } catch (error) {
    console.error("Fehler beim Erstellen der Frage:", error);
    throw error;
  }
}
export default createQuestionData;
