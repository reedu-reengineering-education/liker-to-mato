"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/layout/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  Shield, 
  LogOut,
  CheckCircle,
  AlertCircle,
  CreditCard
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
}

export default function AccountPage() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);
  const [planActiveUntil, setPlanActiveUntil] = useState<Date | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await fetch("/api/subscription");
        const data = await response.json();
        if (data.plan) {
          setCurrentPlan(data.plan);
          setPlanActiveUntil(data.planActiveUntil ? new Date(data.planActiveUntil) : null);
        }
      } catch (error) {
        console.error("Error fetching subscription:", error);
        toast({
          title: "Fehler",
          description: "Plan-Informationen konnten nicht geladen werden.",
          variant: "destructive",
        });
      }
    };

    fetchSubscription();
  }, [toast]);

  const handleUpgrade = async () => {
    router.push("/pricing");
  };

  const containerAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // API-Aufruf hier
      toast({
        title: "Erfolgreich gespeichert",
        description: "Ihre Änderungen wurden erfolgreich übernommen.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Ihre Änderungen konnten nicht gespeichert werden.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container as="main" className="py-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerAnimation}
      >
        {/* Header */}
        <motion.div variants={itemAnimation} className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Account-Einstellungen
          </h1>
          <p className="text-muted-foreground">
            Verwalten Sie Ihre persönlichen Informationen und Einstellungen
          </p>
        </motion.div>

        {/* Main Content */}
        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profil
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Sicherheit
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Benachrichtigungen
            </TabsTrigger>
            <TabsTrigger value="plan" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Plan
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-8">
            <motion.div
              variants={itemAnimation}
              className="bg-card rounded-lg p-6 space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  defaultValue={session?.user?.name || ""}
                  className="max-w-md"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-Mail</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={session?.user?.email || ""}
                  className="max-w-md"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="institution">Institution</Label>
                <Input
                  id="institution"
                  placeholder="z.B. Universität Münster"
                  className="max-w-md"
                />
              </div>

              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"
                  />
                ) : (
                  <CheckCircle className="mr-2 h-4 w-4" />
                )}
                Änderungen speichern
              </Button>
            </motion.div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-8">
            <motion.div
              variants={itemAnimation}
              className="bg-card rounded-lg p-6 space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="current-password">Aktuelles Passwort</Label>
                <Input
                  id="current-password"
                  type="password"
                  className="max-w-md"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">Neues Passwort</Label>
                <Input id="new-password" type="password" className="max-w-md" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Passwort bestätigen</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  className="max-w-md"
                />
              </div>

              <div className="flex items-center justify-between max-w-md">
                <div className="space-y-1">
                  <Label>Zwei-Faktor-Authentifizierung</Label>
                  <p className="text-sm text-muted-foreground">
                    Erhöhen Sie die Sicherheit Ihres Accounts
                  </p>
                </div>
                <Switch />
              </div>

              <Button onClick={handleSave} disabled={isLoading}>
                <Lock className="mr-2 h-4 w-4" />
                Sicherheitseinstellungen aktualisieren
              </Button>
            </motion.div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-8">
            <motion.div
              variants={itemAnimation}
              className="bg-card rounded-lg p-6 space-y-6"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>E-Mail-Benachrichtigungen</Label>
                  <p className="text-sm text-muted-foreground">
                    Erhalten Sie Updates zu Ihren Umfragen
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Neue Antworten</Label>
                  <p className="text-sm text-muted-foreground">
                    Benachrichtigungen bei neuen Umfrageantworten
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Marketing-E-Mails</Label>
                  <p className="text-sm text-muted-foreground">
                    Erhalten Sie Neuigkeiten und Updates
                  </p>
                </div>
                <Switch />
              </div>

              <Button onClick={handleSave} disabled={isLoading}>
                <Bell className="mr-2 h-4 w-4" />
                Benachrichtigungen aktualisieren
              </Button>
            </motion.div>
          </TabsContent>

          {/* Plan Tab */}
          <TabsContent value="plan" className="space-y-8">
            <motion.div
              variants={itemAnimation}
              className="bg-card rounded-lg p-6 space-y-6"
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Ihr aktueller Plan</h3>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium capitalize">{currentPlan?.name || "Free"}</p>
                    <p className="text-sm text-muted-foreground">
                      {currentPlan?.description}
                    </p>
                    {planActiveUntil && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Aktiv bis: {planActiveUntil.toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => router.push("/account/plans")}
                  >
                    {currentPlan?.id === "plan_enterprise" ? "Höchster Plan" : "Plan ändern"}
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Ihre Funktionen</h4>
                <ul className="space-y-2">
                  {currentPlan?.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => router.push("/account/plans")}
                >
                  Alle Pläne vergleichen
                </Button>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Danger Zone */}
        <motion.div
          variants={itemAnimation}
          className="mt-12 p-6 border border-destructive/20 rounded-lg space-y-4"
        >
          <h2 className="text-lg font-semibold text-destructive flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Gefahrenzone
          </h2>
          <p className="text-sm text-muted-foreground">
            Sobald Sie Ihren Account löschen, werden alle Ihre Daten unwiderruflich gelöscht.
            Dieser Vorgang kann nicht rückgängig gemacht werden.
          </p>
          <Button variant="destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Account löschen
          </Button>
        </motion.div>
      </motion.div>
    </Container>
  );
}
