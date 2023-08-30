import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { PlusIcon } from "lucide-react";
import { Slider } from "../ui/slider";
import { Textarea } from "../ui/textarea";

export function CreateQuestionDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon className="mr-2 h-4 w-4"></PlusIcon>
          Erstelle eine neue Umfrage
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Erstelle eine neue Umfrage</DialogTitle>
          <DialogDescription>
            Gib einen Namen für eine neue Umfrage ein.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="name" className="ml-3">
              Survey title
            </Label>
            <Input
              id="name"
              placeholder="for example, lecture feedback "
              className="col-span-3"
            />
          </div>
          <div>
            <Label htmlFor="name" className="ml-3">
              Survey description
            </Label>
            <Textarea
              id="name"
              placeholder="for example, how satisfied are you with the lecture?"
              className="col-span-3"
            ></Textarea>
          </div>
          <div>
            <Slider
              className="grid w-full max-w-sm items-center gap-2"
              defaultValue={[0]}
              max={100}
              step={33.33333333333333}
            />
          </div>
        </div>
        <DialogFooter>
          <div>
            <Button variant="destructive" type="submit">
              Delete
            </Button>
          </div>
          <div>
            <Button type="submit">Save</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
