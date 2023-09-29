import axios from "axios";

export async function createQuestion(
  name: String,
  description: String,
  min: String,
  steps: number,
  max: String,
  surveyId: String
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

export async function readQuestion(questionId: String) {
  const apiUrl = `/api/question/${questionId}`;

  try {
    const response = await axios.get(apiUrl);
    const getQuestion = response.data;
    return getQuestion;
  } catch (error) {
    console.error("Error when requesting the question:", error);
    throw error;
  }
}

export async function updateQuestion(
  questionId: String,
  name: String,
  description: String,
  min: String,
  steps: number,
  max: String,
  surveyId: String
): Promise<any> {
  const apiUrl = `/api/question/${questionId}`;

  try {
    const response = await axios.put(apiUrl, {
      name,
      description,
      min,
      steps,
      max,
      surveyId,
    });
    const updatedQuestion = response.data;
    return updatedQuestion;
  } catch (error) {
    console.error("Error when updating the question:", error);
    throw error;
  }
}

export async function deleteQuestion(questionId: String) {
  const apiUrl = `/api/question/${questionId}`;

  try {
    await axios.delete(apiUrl);
    console.log("Question deleted");
  } catch (error) {
    console.error("Error when deleting the survey:", error);
    throw error;
  }
}

