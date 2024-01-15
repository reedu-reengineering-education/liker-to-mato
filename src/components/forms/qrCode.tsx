import * as React from "react";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import QRCode from "qrcode.react";
import { QrCodeIcon } from "@heroicons/react/20/solid";

type Props = {
  surveyId: string;
  children?: React.ReactNode;
};

export function QrCodeDialog({ surveyId, children }: Props) {
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
          <div className="flex justify-center">
            <QRCode value={surveyId} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
