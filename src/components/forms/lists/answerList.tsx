// import * as React from "react";
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
// import BarChart from "@/components/ui/barchart"; // Importiere die BarChart-Komponente

// export default function ListAnswer({ questionId }: { questionId: string }) {
//   console.log("Question ID:", questionId);
//   return (
//     <Drawer>
//       <DrawerTrigger asChild>
//         <Button variant="outline">View Data</Button>
//       </DrawerTrigger>
//       <DrawerContent>
//         <div className="mx-auto w-full max-w-sm">
//           <DrawerHeader>
//             <DrawerTitle></DrawerTitle>
//             <DrawerDescription></DrawerDescription>
//           </DrawerHeader>
//           <div className="p-4 pb-0">
//             <div className="flex items-center justify-center space-x-2">
//               <div className="flex-1 text-center">
//                 <BarChart questionId={questionId} />
//                 <div className="text-7xl font-bold tracking-tighter"></div>
//                 <div className="text-[0.70rem] uppercase text-muted-foreground"></div>
//               </div>
//             </div>
//             <div className="mt-3 h-[120px]"></div>
//           </div>
//           <DrawerFooter>
//             <Button>Submit</Button>
//             <DrawerClose asChild>
//               <Button variant="outline">Cancel</Button>
//             </DrawerClose>
//           </DrawerFooter>
//         </div>
//       </DrawerContent>
//     </Drawer>
//   );
// }
"use client";
import React from "react";
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
import BarChart from "@/components/ui/barchart"; // Importiere die BarChart-Komponente

export default function ListAnswer({ questionId }: { questionId: string }) {
  console.log("Question ID in ListAnswer:", questionId); // Debugging

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">View Data</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Chart Data</DrawerTitle>
            <DrawerDescription>
              View the answers for the selected question
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <div className="flex-1 text-center">
                <BarChart questionId={questionId} />
                <div className="text-7xl font-bold tracking-tighter"></div>
                <div className="text-[0.70rem] uppercase text-muted-foreground"></div>
              </div>
            </div>
            <div className="mt-3 h-[120px]"></div>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
