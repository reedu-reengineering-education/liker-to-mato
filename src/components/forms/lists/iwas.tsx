import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDaysIcon } from "lucide-react";

export function Iwas() {
  return (
    <div className="items-center w-full justify-center">
      <Card className="w-full border-8 border-card material-glass border-bend max-w-md rounded-lg shadow-md">
        <div className="overflow-hidden flex-row">
          <iframe
            src="https://html23.com/?p=4HdqTa6yXpKij11baVL5"
            style={{ width: "100%", height: "500px", border: "none" }}
          />
        </div>
        <CardContent className="pt-6 md:p-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Beautiful Card Design</h3>
            <p className="text-gray-500 dark:text-gray-400">
              This is a beautifully designed card component with a clean, modern
              look. It has a subtle border and drop shadow to make it stand out.
            </p>
            <div className="flex items-center justify-between">
              <Button>Learn More</Button>
              <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                <CalendarDaysIcon className="h-5 w-5" />
                <span className="text-sm">April 26, 2024</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
