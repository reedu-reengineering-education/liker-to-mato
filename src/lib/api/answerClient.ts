import axios from 'axios';

interface GroupedAnswer {
  value: number;
  _count: {
    value: number;
  };
}

export async function createAnswer(value: number, questionId: string) {
  const apiUrl = `/api/answer`;

  try {
    const response = await axios.post(apiUrl, { value, questionId });
    return response.data;
  } catch (error) {
    console.error('Error when creating the answer:', error);
  }
}

export async function getAnswers(questionId: String) {
  const apiUrl = `/api/answer/question/[questionId]`;

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error when requesting the answer', error);
    throw error;
  }
}

export const getGroupedAnswers = async (questionId: string): Promise<GroupedAnswer[]> => {
  const response = await axios.get<GroupedAnswer[]>(`/api/groupedAnswers?questionId=${questionId}`);
  return response.data;
};
