import CreateQuestionDialog from "@/components/forms/create-question-form";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

export default async function Studio({
  params,
}: {
  params: { surveyId: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/api/auth/signin") || notFound();
  } else {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <CreateQuestionDialog surveyId={params.surveyId} />
      </main>
    );
  }
}
