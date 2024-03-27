import axios from "axios";

export async function createAnswer(value: string, questionId: string) {
  const apiUrl = `/api/answer`;
  try {
    const response = await axios.post(apiUrl, { value, questionId });
    return response.data;
  } catch (error) {
    console.error("Error when creating the answer:", error);
  }
}


// export async function readAnswer(answerId: string) {
//   const apiUrl = `/api/answer/${answerId}`;

//   try {
//     const response = await axios.get(apiUrl);
//     const getAnswer = response.data;
//     return getAnswer;
//   } catch (error) {
//     console.error("Error when requsting the answer", error);
//     throw error;
//   }
// }

// readAnswer;

// export async function updateAnswer(value: string) {
//   const apiUrl = `/api/answer/${value}`;

//   try {
//     const response = await axios.put(apiUrl, { value });
//     const updateAnswer = response.data;
//     return updateAnswer;
//   } catch (error) {
//     console.error("Error when updating the answer:", error);
//     throw error;
//   }
// }

// export async function deleteAnswer(answerId: string) {
//   const apiUrl = `/api/answer/${answerId}`;

//   try {
//     const response = await axios.delete(apiUrl);
//     const deleteAnswer = response.data;
//     return deleteAnswer;
//   } catch (error) {
//     console.error("Error when deleting the answer:", error);
//     throw error;
//   }
// }
