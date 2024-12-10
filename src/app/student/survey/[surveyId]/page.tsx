import { StudentSurveyView } from '@/components/forms/student-survey-view';

interface Props {
  params: {
    surveyId: string;
  };
}

export default function SurveyPage({ params }: Props) {
  return (
    <div className="container py-10">
      <StudentSurveyView surveyId={params.surveyId} />
    </div>
  );
}
