'use client';

import { Suspense } from 'react';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  BarChart,
  Activity,
  FileText,
  Plus,
  Calendar,
  Users,
  Settings,
  Bell,
  ChevronRight,
  Clock,
  Star,
  CheckCircle,
} from 'lucide-react';
import { Container } from '@/components/ui/layout/Container';
import { Grid } from '@/components/ui/layout/Grid';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}

function DashboardContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams?.get('token');

    if (status === 'unauthenticated' && token) {
      signIn('email', { token, redirect: false });
    }
  }, [status, searchParams]);

  if (status === 'loading') {
    return <DashboardSkeleton />;
  }

  if (status === 'unauthenticated') {
    router.push('/auth/signin');
    return null;
  }

  const recentActivity = [
    {
      action: 'Neue Antworten',
      description: "5 neue Antworten für 'Nutzerzufriedenheit Q4'",
      time: 'Vor 2 Stunden',
      icon: Users,
    },
    {
      action: 'Umfrage erstellt',
      description: 'Mitarbeiterfeedback 2024 wurde erstellt',
      time: 'Vor 1 Tag',
      icon: Plus,
    },
    {
      action: 'Bericht generiert',
      description: 'Produktevaluation Bericht wurde erstellt',
      time: 'Vor 2 Tagen',
      icon: FileText,
    },
  ];

  return (
    <Container as="main" className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Willkommen zurück, {session?.user?.name?.split(' ')[0]}
            </h1>
            <p className="text-muted-foreground text-lg">
              Hier ist ein Überblick über Ihre Umfragen und Aktivitäten
            </p>
          </div>
          <Button
            size="lg"
            className="flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="w-5 h-5" />
            Neue Umfrage
          </Button>
        </div>

        <Grid cols={3} gap="md" className="mb-8">
          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Card className="border-l-4 border-l-primary">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Aktive Umfragen</CardTitle>
                <Activity className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">12</div>
                <p className="text-sm text-muted-foreground">+2 seit letztem Monat</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Gesammelte Antworten</CardTitle>
                <BarChart className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-500">2,345</div>
                <p className="text-sm text-muted-foreground">+180 in den letzten 7 Tagen</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fertige Berichte</CardTitle>
                <FileText className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">8</div>
                <p className="text-sm text-muted-foreground">+3 seit letztem Monat</p>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid cols={2} gap="lg">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Neueste Umfragen</CardTitle>
                    <CardDescription>
                      Ihre kürzlich erstellten oder aktualisierten Umfragen
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Calendar className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Nutzerzufriedenheit Q4',
                      responses: 234,
                      status: 'Aktiv',
                      progress: 75,
                    },
                    {
                      title: 'Mitarbeiterfeedback 2024',
                      responses: 89,
                      status: 'Entwurf',
                      progress: 30,
                    },
                    {
                      title: 'Produktevaluation',
                      responses: 567,
                      status: 'Abgeschlossen',
                      progress: 100,
                    },
                  ].map((survey, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.01 }}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-all cursor-pointer"
                    >
                      <div className="space-y-1">
                        <h3 className="font-medium flex items-center gap-2">
                          {survey.title}
                          {survey.status === 'Aktiv' && (
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {survey.responses} Antworten
                        </p>
                        <div className="w-32 h-1 bg-muted-foreground/20 rounded-full">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${survey.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span
                          className={cn('text-sm px-3 py-1 rounded-full font-medium', {
                            'bg-primary/10 text-primary': survey.status === 'Aktiv',
                            'bg-muted text-muted-foreground': survey.status === 'Entwurf',
                            'bg-green-100 text-green-700': survey.status === 'Abgeschlossen',
                          })}
                        >
                          {survey.status}
                        </span>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Alle Umfragen anzeigen
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Letzte Aktivitäten</CardTitle>
                    <CardDescription>Ihre neuesten Aktivitäten und Updates</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Clock className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="rounded-full p-2 bg-muted">
                        <activity.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{activity.action}</h4>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Ihr Profil</CardTitle>
                    <CardDescription>Verwalten Sie Ihre persönlichen Einstellungen</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20 ring-2 ring-primary ring-offset-2">
                    <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} />
                    <AvatarFallback className="text-lg">
                      {session?.user?.name?.[0] || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="text-xl font-medium">{session?.user?.name}</h3>
                    <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
                    <div className="flex gap-2 mt-2">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-4 w-4" />
                        <span>Pro Plan</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4" />
                        <span>Verifiziert</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Einstellungen
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Bell className="mr-2 h-4 w-4" />
                    Benachrichtigungen
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Schnellzugriff</CardTitle>
                <CardDescription>Häufig verwendete Funktionen</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      title: 'Neue Umfrage',
                      icon: Plus,
                      color: 'text-primary',
                    },
                    {
                      title: 'Berichte',
                      icon: FileText,
                      color: 'text-green-500',
                    },
                    {
                      title: 'Statistiken',
                      icon: BarChart,
                      color: 'text-blue-500',
                    },
                    {
                      title: 'Teilnehmer',
                      icon: Users,
                      color: 'text-orange-500',
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-all cursor-pointer"
                    >
                      <item.icon className={cn('h-6 w-6 mb-2', item.color)} />
                      <h4 className="font-medium">{item.title}</h4>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </Grid>
      </motion.div>
    </Container>
  );
}

function DashboardSkeleton() {
  return (
    <Container as="main" className="py-8">
      <div className="h-8 w-48 bg-muted rounded-md mb-8" />
      <Grid cols={3} gap="md" className="mb-8">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="h-4 w-24 bg-muted rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-6 w-16 bg-muted rounded mb-1" />
              <div className="h-3 w-32 bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </Grid>
      <div className="h-64 bg-muted rounded-lg" />
    </Container>
  );
}
