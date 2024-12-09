"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { QrCode, Link as LinkIcon, Copy } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

type QrCodeDialogProps = {
  surveyId: string;
  children?: React.ReactNode;
};

export function QrCodeDialog({ surveyId }: QrCodeDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  // Konstruiere die absolute URL für die Umfrage
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BASE_URL || "";
  const surveyUrl = `${baseUrl}/student/survey/${surveyId}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(surveyUrl);
      toast({
        title: "Link kopiert",
        description: "Der Umfrage-Link wurde in die Zwischenablage kopiert.",
      });
    } catch (err) {
      console.error("Fehler beim Kopieren in die Zwischenablage:", err);
      toast({
        title: "Fehler",
        description:
          "Der Link konnte nicht kopiert werden. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <QrCode className="h-4 w-4" />
          QR-Code
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Umfrage-QR-Code</DialogTitle>
          <DialogDescription>
            Scannen Sie den QR-Code oder nutzen Sie den Link, um an der Umfrage
            teilzunehmen.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-white rounded-lg">
            <QRCode value={surveyUrl} size={200} />
          </div>

          <div className="flex items-center gap-2 w-full">
            <code className="flex-1 p-2 bg-muted rounded text-sm break-all">
              {surveyUrl}
            </code>
            <Button variant="outline" size="icon" onClick={copyToClipboard}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          <Link href={surveyUrl} target="_blank">
            <Button className="gap-2">
              <LinkIcon className="h-4 w-4" />
              Zur Umfrage
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default QrCodeDialog;
