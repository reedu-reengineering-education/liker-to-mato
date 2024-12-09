"use client"

import { PayPalButton } from "@/components/payment/paypal-button"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

const plans = [
  {
    id: "plan_free",
    name: "Free",
    price: 0,
    description: "Perfekt zum Testen und für kleine Projekte",
    features: [
      "1 Umfrage",
      "50 Antworten pro Monat",
      "Basis-Auswertungen",
      "Community Support",
    ],
    popular: false,
  },
  {
    id: "plan_professional",
    name: "Professional",
    price: 29.99,
    description: "Ideal für wachsende Unternehmen",
    features: [
      "Unbegrenzte Umfragen",
      "1000 Antworten pro Monat",
      "Erweiterte Auswertungen",
      "Prioritäts-Support",
      "Eigenes Branding",
    ],
    popular: true,
  },
  {
    id: "plan_enterprise",
    name: "Enterprise",
    price: 99.99,
    description: "Für große Organisationen",
    features: [
      "Unbegrenzte Umfragen",
      "Unbegrenzte Antworten",
      "Premium Auswertungen",
      "24/7 Support",
      "Eigenes Branding",
      "API Zugang",
      "SLA Garantie",
    ],
    popular: false,
  },
]

export default function PlansPage() {
  const { toast } = useToast()

  const handleSuccess = (details: any) => {
    console.log("Zahlung erfolgreich!", details)
    toast({
      title: "Plan aktiviert",
      description: "Dein neuer Plan wurde erfolgreich aktiviert.",
    })
  }

  const handleError = (error: any) => {
    console.error("Fehler bei der Zahlung:", error)
    toast({
      title: "Fehler",
      description: "Es gab einen Fehler bei der Aktivierung des Plans.",
      variant: "destructive",
    })
  }

  const handleFreePlan = async () => {
    try {
      const response = await fetch("/api/plans/activate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId: "plan_free",
          paymentDetails: { id: "free_plan" },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to activate free plan")
      }

      toast({
        title: "Plan aktiviert",
        description: "Der kostenlose Plan wurde aktiviert.",
      })
    } catch (error) {
      console.error("Error activating free plan:", error)
      toast({
        title: "Fehler",
        description: "Der Plan konnte nicht aktiviert werden.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Wähle deinen Plan</h1>
        <p className="text-muted-foreground">
          Flexible Pläne für jede Anforderung. Jederzeit kündbar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative ${
              plan.popular ? "border-primary shadow-lg" : ""
            }`}
          >
            {plan.popular && (
              <Badge
                className="absolute -top-2 -right-2"
                variant="default"
              >
                Beliebt
              </Badge>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                {plan.price === 0 ? (
                  <span className="text-3xl font-bold">Kostenlos</span>
                ) : (
                  <>
                    <span className="text-3xl font-bold">€{plan.price}</span>
                    <span className="text-muted-foreground">/Monat</span>
                  </>
                )}
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <div className="w-full">
                {plan.price === 0 ? (
                  <Button
                    onClick={handleFreePlan}
                    className="w-full"
                    variant="outline"
                  >
                    Kostenlos starten
                  </Button>
                ) : (
                  <PayPalButton
                    amount={plan.price}
                    planId={plan.id}
                    onSuccess={handleSuccess}
                    onError={handleError}
                  />
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
