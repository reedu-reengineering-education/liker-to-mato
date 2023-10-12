import CreateQuestionDialog from "@/components/forms/create-question-form";

export default function Studio({ params }: { params: { surveyId: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CreateQuestionDialog surveyId={params.surveyId} />
    </main>
  );
}
