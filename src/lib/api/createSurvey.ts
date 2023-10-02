import axios from "axios";

async function createSurvey(name: String) {
  const apiUrl = `/api/survey`;

  try {
    const response = await axios.post(apiUrl, { name });
    const crateSurvey = response.data;
    return crateSurvey;
  } catch (error) {
    console.error("Error when creating the survey:", error);
    throw error;
  }
}

export default createSurvey;
