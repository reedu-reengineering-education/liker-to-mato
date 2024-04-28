"use client";
import * as React from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import QRCode from "qrcode.react";
import { QrCodeIcon } from "@heroicons/react/20/solid";

type Props = {
  surveyId: string;
  children?: React.ReactNode;
  url: string;
};

export function QrCodeDialog({ surveyId }: Props) {
  const url = `/survey/${surveyId}`;
  // const router = useRouter();

  return (
    <div className="flex">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <QrCodeIcon className="mr-1.5 h-5 w-5" aria-hidden="true" />
            QR-Code
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex">This survey</DialogTitle>
            <DialogDescription>
              <div className="flex justify-center">
                <QRCode value={url} />
              </div>
            </DialogDescription>
          </DialogHeader>
          <div>
            <DialogFooter>
              <Button
                onClick={() => {
                  // router.push(url);
                  window.open(url);
                }}
              >
                link to set your answer
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
