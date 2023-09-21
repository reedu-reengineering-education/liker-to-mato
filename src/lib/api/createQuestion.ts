import axios from "axios";

async function createQuestion(
  name: string,
  description: string,
  min: string,
  steps: number,
  max: string,
  surveyId: string
) {
  const apiUrl = "/api/question";
  try {
    const response = await axios.post(apiUrl, {
      name,
      description,
      min,
      steps,
      max,
      surveyId,
    });
    const createQuestion = response.data;
    return createQuestion;
  } catch (error) {
    console.error("Error when creating the question:", error);
    throw error;
  }
}
export default createQuestion;
