import axios from "axios";

export async function createAnswer(value: number, questionId: string) {
  const apiUrl = `/api/answer`;

  try {
    const response = await axios.post(apiUrl, { value, questionId });
    return response.data;
  } catch (error) {
    console.error("Error when creating the answer:", error);
  }
}

export async function questionAnswers(questionId: String) {
  const apiUrl = `/api/answer/${questionId}`;

  try {
    const response = await axios.get(apiUrl);
    const answerList = response.data;
    return answerList;
  } catch (error) {
    console.error("Error when requesting the answer", error);
    throw error;
  }
}
