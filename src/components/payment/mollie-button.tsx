"use client"

import { Button } from "@/components/ui/button"

interface MollieButtonProps {
  amount: number
  description: string
  onSuccess?: () => void
  onError?: (error: any) => void
}

export function MollieButton({
  amount,
  description,
  onSuccess,
  onError,
}: MollieButtonProps) {
  const handleClick = async () => {
    try {
      const response = await fetch("/api/mollie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, description }),
      })

      const data = await response.json()

      if (data.url) {
        // Redirect to Mollie checkout
        window.location.href = data.url
        onSuccess?.()
      } else {
        throw new Error("No checkout URL received")
      }
    } catch (error) {
      console.error("Error creating Mollie payment:", error)
      onError?.(error)
    }
  }

  return (
    <Button
      onClick={handleClick}
      className="w-full"
    >
      Mit iDEAL bezahlen
    </Button>
  )
}
