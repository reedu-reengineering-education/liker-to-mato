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


