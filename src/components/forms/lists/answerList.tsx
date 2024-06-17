// "use client";
// import React, { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import BarChart from "@/components/ui/barchart";
// import { surveyQuestions } from "@/lib/api/surveyClient";
// import { Question } from "@prisma/client";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { ChartBarIcon, ChartPieIcon } from "@heroicons/react/20/solid";

// type AnsweListProps = {
//   surveyId: string;
//   name: string;
//   min: string;
//   max: string;
// };

// export default function ListAnswer(props: AnsweListProps) {
//   const [questions, setQuestions] = useState<Question[]>([]);

//   useEffect(() => {
//     surveyQuestions(props.surveyId)
//       .then(setQuestions)
//       .catch((error) => console.error(error));
//   }, [props.surveyId]);

//   return (
//     <Drawer>
//       <DrawerTrigger asChild>
//         <Button variant="outline">Charts</Button>
//       </DrawerTrigger>
//       <DrawerContent>
//         <div className="mx-auto w-full max-w-7xl">
//           <DrawerHeader>
//             <DrawerDescription>
//               <Tabs
//                 defaultValue="account"
//                 className=" flex justify-center flex-row  w-[300px]   "
//               >
//                 <TabsList className="grid w-full grid-cols-2">
//                   <TabsTrigger value="account">
//                     <div className="w-5 ">
//                       <ChartBarIcon></ChartBarIcon>
//                     </div>
//                   </TabsTrigger>
//                   <TabsTrigger value="password">
//                     <div className="w-5 ">
//                       <ChartPieIcon></ChartPieIcon>
//                     </div>
//                   </TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="account"></TabsContent>
//               </Tabs>
//             </DrawerDescription>
//           </DrawerHeader>
//           <div className="p-4 pb-0">
//             <Carousel
//               opts={{
//                 align: "start",
//               }}
//               className="w-full"
//             >
//               <CarouselContent>
//                 {questions.map((question) => (
//                   <CarouselItem
//                     key={question.id}
//                     className="md:basis-1/2 lg:basis-1/2"
//                   >
//                     <div className="p-1">
//                       <Card>
//                         <CardContent className="flex aspect-square items-center justify-center p-6 h-[65vh]">
//                           <BarChart questionId={question.id} />
//                         </CardContent>
//                         <p></p>
//                       </Card>
//                     </div>
//                   </CarouselItem>
//                 ))}
//               </CarouselContent>
//               <CarouselPrevious />
//               <CarouselNext />
//             </Carousel>
//           </div>
//           <DrawerFooter className="flex flex-row justify-center w-full">
//             <DrawerClose asChild>
//               <Button variant="default" className="px-28">
//                 Close
//               </Button>
//             </DrawerClose>
//           </DrawerFooter>
//         </div>
//       </DrawerContent>
//     </Drawer>
//   );
// }
"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BarChart from "@/components/ui/barchart";
import PieChart from "@/components/ui/piechart";
import { surveyQuestions } from "@/lib/api/surveyClient";
import { Question } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartBarIcon, ChartPieIcon } from "@heroicons/react/20/solid";

type AnswerListProps = {
  surveyId: string;
};

export default function ListAnswer(props: AnswerListProps) {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    surveyQuestions(props.surveyId)
      .then(setQuestions)
      .catch((error) => console.error(error));
  }, [props.surveyId]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Charts</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-7xl">
          <DrawerHeader>
            <DrawerTitle>Chart Data</DrawerTitle>
            <DrawerDescription>
              <Tabs defaultValue="bar" className="w-full">
                <TabsList className="flex justify-center w-full">
                  <TabsTrigger
                    value="bar"
                    className="flex-1 flex justify-center"
                  >
                    <ChartBarIcon className="w-5" />
                  </TabsTrigger>
                  <TabsTrigger
                    value="pie"
                    className="flex-1 flex justify-center"
                  >
                    <ChartPieIcon className="w-5" />
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="bar">
                  <div className="p-4 pb-0">
                    <Carousel
                      opts={{
                        align: "start",
                      }}
                      className="w-full"
                    >
                      <CarouselContent>
                        {questions.map((question) => (
                          <CarouselItem
                            key={question.id}
                            className="md:basis-1/2 lg:basis-1/2"
                          >
                            <div className="p-1">
                              <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6 h-[65vh]">
                                  <BarChart questionId={question.id} />
                                </CardContent>
                              </Card>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  </div>
                </TabsContent>
                <TabsContent value="pie">
                  <div className="p-4 pb-0">
                    <Carousel
                      opts={{
                        align: "start",
                      }}
                      className="w-full"
                    >
                      <CarouselContent>
                        {questions.map((question) => (
                          <CarouselItem
                            key={question.id}
                            className="md:basis-1/2 lg:basis-1/2"
                          >
                            <div className="p-1">
                              <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6 h-[65vh]">
                                  <PieChart questionId={question.id} />
                                </CardContent>
                              </Card>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  </div>
                </TabsContent>
              </Tabs>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="flex flex-row justify-center w-full">
            <DrawerClose asChild>
              <Button variant="default" className="px-28">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
