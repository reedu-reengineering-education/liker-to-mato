// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import { Question } from "@prisma/client";
// import { Button } from "@/components/ui/button";
// import { TrashIcon } from "@heroicons/react/20/solid";
// import { surveyQuestions } from "@/lib/api/surveyClient";
// import { deleteQuestion } from "@/lib/api/questionClient";
// import CreateQuestionDialog from "../create-question-form";
// import EditQuestionDialog from "@/components/buttons/edit-question-button";
// import { useRouter } from "next/navigation";
// import { ArrowLeftIcon, CodeBracketIcon } from "@heroicons/react/20/solid";

// export function ListQuestions({ surveyId }: { surveyId: string }) {
//   const router = useRouter();
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const loadQuestionsRef = useRef(() => {});
//   const mydiv = useRef<HTMLDivElement>(null);
//   loadQuestionsRef.current = () => {
//     surveyQuestions(surveyId)
//       .then(setQuestions)
//       .catch((error) => console.error(error));
//   };
//   useEffect(() => {
//     loadQuestionsRef.current();
//   }, [surveyId]);

//   useEffect(() => {
//     surveyQuestions(surveyId)
//       .then(setQuestions)
//       .catch((error) => console.error(error));
//   }, [surveyId]);
//   console.log(mydiv.current);
//   const handleDelete = async (questionId: string) => {
//     try {
//       await deleteQuestion(questionId);
//       setQuestions((questions) =>
//         questions.filter((question) => question.id !== questionId)
//       );
//     } catch (error) {
//       console.error("Error when deleting the question:", error);
//     }
//   };

//   const onQuestionCreated = () => {
//     loadQuestionsRef.current();
//   };

//   return (
//     <div ref={mydiv}>
//       <div>
//         <CreateQuestionDialog
//           surveyId={surveyId}
//           handleQuestionCreated={onQuestionCreated}
//         />

//         <Button
//           className=" ml-80 "
//           variant={"outline"}
//           onClick={() => router.back()}
//         >
//           <ArrowLeftIcon
//             className="mr-1.5 h-5 w-5"
//             aria-hidden="true"
//           ></ArrowLeftIcon>
//           Back
//         </Button>

//         <div>
//           {questions.map((question) => (
//             <div
//               key={question.id}
//               className="mt-4 p-4 shadow rounded-lg bg-white"
//             >
//               <li className="mb-4 text-lg font-semibold"></li>
//               <p className="mb-4 text-lg font-semibold">{question.name}</p>
//               <p className="mb-4 text-lg font-semibold">
//                 {" "}
//                 {question.description}
//               </p>
//               <p className="mb-4 text-lg font-semibold"> {question.max}</p>
//               <p className="mb-4 text-lg font-semibold"> {question.steps}</p>
//               <p className="mb-4 text-lg font-semibold"> {question.min}</p>
//               <div className="flex space-x-2 mt-3">
//                 <EditQuestionDialog
//                   question={question}
//                   surveyId={surveyId}
//                   handleQuestionUpdated={onQuestionCreated}
//                 />
//                 <Button variant="outline">
//                   <CodeBracketIcon className="mr-1.5 h-5 w-5"></CodeBracketIcon>
//                   Embed
//                 </Button>

//                 <Button
//                   variant="destructive"
//                   onClick={() => handleDelete(question.id)}
//                 >
//                   <TrashIcon className="mr-1.5 h-5 w-5" aria-hidden="true" />
//                   Delete
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Question } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowLeft, Trash, Edit, Code, MoreVertical } from "lucide-react";
import { surveyQuestions } from "@/lib/api/surveyClient";
import { deleteQuestion } from "@/lib/api/questionClient";
import CreateQuestionDialog from "../create-question-form";
import EditQuestionDialog from "@/components/buttons/edit-question-button";

export function ListQuestions({ surveyId }: { surveyId: string }) {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadQuestions = async () => {
    try {
      setIsLoading(true);
      const fetchedQuestions = await surveyQuestions(surveyId);
      setQuestions(fetchedQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
      toast({
        title: "Error",
        description: "Failed to load questions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, [surveyId]);

  const handleDelete = async (questionId: string) => {
    try {
      await deleteQuestion(questionId);
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.id !== questionId)
      );
      toast({
        title: "Question deleted",
        description: "The question has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error when deleting the question:", error);
      toast({
        title: "Error",
        description: "Failed to delete the question. Please try again.",
        variant: "destructive",
      });
    }
  };

  const onQuestionCreated = () => {
    loadQuestions();
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-4 w-[250px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-[200px]" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-[300px]" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <CreateQuestionDialog
          surveyId={surveyId}
          handleQuestionCreated={onQuestionCreated}
        />
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      {questions.map((question) => (
        <Card key={question.id}>
          <CardHeader>
            <CardTitle>{question.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {question.description}
            </p>
            <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
              <div>Min: {question.min}</div>
              <div>Max: {question.max}</div>
              <div>Steps: {question.steps}</div>
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <EditQuestionDialog
              question={question}
              surveyId={surveyId}
              handleQuestionUpdated={onQuestionCreated}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => console.log("Embed clicked")}>
                  <Code className="mr-2 h-4 w-4" />
                  Embed
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDelete(question.id)}
                  className="text-red-600"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
