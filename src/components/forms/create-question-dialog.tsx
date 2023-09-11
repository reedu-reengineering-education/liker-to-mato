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

import { Textarea } from "../ui/textarea";

export function CreateQuestionDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon className="mr-2 h-4 w-4"></PlusIcon>
          Frage hinzufügen
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Stell eine Frage</DialogTitle>
          <DialogDescription>
            Gib einen Namen für eine neue Umfrage ein.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="name" className="flex">
              Frage
            </Label>
            <Input
              id="name"
              placeholder="for example, how is it outside "
              className="col-span-3"
            />
          </div>
          <div>
            <Label htmlFor="name" className=" flex-3">
              Fragestellung
            </Label>
            <Textarea
              id="name"
              placeholder="for example, describe here?"
              className="col-span-3"
            ></Textarea>
          </div>
        </div>
        <div className="mb-6 flex flex-row gap-4 ">
          <div className=" flex-col">
            <Label>Minimum</Label>
            <Input type="text" placeholder="text"></Input>
          </div>
          <div className=" flex-col">
            <Label>Stepps</Label>
            <Input type="number" placeholder="zahl"></Input>
          </div>
          <div className=" flex-col">
            <Label>Maximum</Label>
            <Input type="text" placeholder="text"></Input>
          </div>
        </div>
        <DialogFooter>
          <div>
            <Button variant="secondary" type="submit">
              Cancel
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
