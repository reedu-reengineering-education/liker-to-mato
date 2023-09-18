import axios from "axios";

// Eine Funktion, um GET-Anfragen für Fragen durchzuführen
export async function getQuestionData(questionId: string) {
  const apiUrl = `/api/question/${questionId}`;

  try {
    const response = await axios.get(apiUrl);
    const questionData = response.data;
    return questionData;
  } catch (error) {
    console.error("Fehler beim Abrufen der Frage:", error);
    throw error;
  }
}

// Eine Funktion, um PUT-Anfragen für Fragen durchzuführen
export async function updateQuestionData(
  questionId: string,
  name: string,
  description: string,
  min: number,
  steps: number[],
  max: number,
  surveyId: string
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
    });
    const updatedQuestionData = response.data;
    return updatedQuestionData;
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Frage:", error);
    throw error;
  }
}

// Eine Funktion, um DELETE-Anfragen für Fragen durchzuführen
export async function deleteQuestionData(questionId: string) {
  const apiUrl = `/api/question/${questionId}`;

  try {
    await axios.delete(apiUrl);
    console.log("Frage gelöscht");
  } catch (error) {
    console.error("Fehler beim Löschen der Frage:", error);
    throw error;
  }
}

// import axios from "axios";

// // Eine Funktion, um GET-Anfragen durchzuführen
// export async function getquestionData(questionId: any) {
//   const apiUrl = `/api/question/${questionId}`;

//   try {
//     const response = await axios.get(apiUrl);
//     const questionData = response.data;
//     return questionData;
//   } catch (error) {
//     console.error("Fehler beim Abrufen der Umfrage:", error);
//     throw error;
//   }
// }

// // Eine Funktion, um PUT-Anfragen durchzuführen
// export async function updateQuestionData(questionId: any, name: any, userId: any) {
//   const apiUrl = `/api/question/${questionId}`;

//   try {
//     const response = await axios.put(apiUrl, { name, userId });
//     const updatedQuestionData = response.data;
//     return updatedQuestionData;
//   } catch (error) {
//     console.error("Fehler beim Aktualisieren der Umfrage:", error);
//     throw error;
//   }
// }

// // Eine Funktion, um DELETE-Anfragen durchzuführen
// export async function deleteQuestionData(questionId: any) {
//   const apiUrl = `/api/question/${questionId}`;

//   try {
//     await axios.delete(apiUrl);
//     console.log("Umfrage gelöscht");
//   } catch (error) {
//     console.error("Fehler beim Löschen der Umfrage:", error);
//     throw error;
//   }
// }
