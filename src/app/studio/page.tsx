import { Button } from "@/components/ui/button";

import { Slider } from "@/components/ui/slider";
import { CreateQuestionDialog } from "@/components/forms/create-question-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Studio() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>Hier</Button>

      <Slider
        className="grid w-full max-w-sm items-center gap-2"
        defaultValue={[0]}
        max={100}
        step={33.33333333333333}
      />
      <CreateQuestionDialog></CreateQuestionDialog>
      <Card className="min-w-[20rem]">
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content</p>
        </CardContent>
        <CardFooter>
          <p>Footer</p>
          <Button>Button</Button>
          <Button>Button</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
