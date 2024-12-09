import axios from "axios";

export async function createQuestion(
  name: string,
  description: string,
  min: string,
  steps: number,
  max: string,
  surveyId: string,
  scaleType?: string,
  scaleOptions?: string[],
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
      scaleType,
      scaleOptions,
    });
    return response.data;
  } catch (error) {
    console.error("Error when creating the question:", error);
    throw error;
  }
}

export async function readQuestion(questionId: string) {
  const apiUrl = `/api/question/${questionId}`;
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error when requesting the question:", error);
    throw error;
  }
}

export async function updateQuestion(
  questionId: string,
  name: string,
  description: string,
  min: string,
  steps: number,
  max: string,
  surveyId: string,
  scaleType?: string,
  scaleOptions?: string[],
) {
  const apiUrl = `/api/question/${questionId}`;
  try {
    const response = await axios.put(apiUrl, {
      name,
      description,
      min,
      steps,
      max,
      surveyId,
      scaleType,
      scaleOptions,
    });
    return response.data;
  } catch (error) {
    console.error("Error when updating the question:", error);
    throw error;
  }
}

export async function deleteQuestion(questionId: string) {
  const apiUrl = `/api/question/${questionId}`;
  try {
    const response = await axios.delete(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error when deleting the question:", error);
    throw error;
  }
}
