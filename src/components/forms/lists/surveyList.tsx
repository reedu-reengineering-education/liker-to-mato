'use client';

import { useEffect, useState } from 'react';
import { Survey } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  PencilIcon,
  ShareIcon,
  TrashIcon,
  ChartBarIcon,
  QrCodeIcon,
  FunnelIcon,
} from '@heroicons/react/20/solid';
import ButtonActions from '@/components/buttons/buttonsActions';
import { userSurveys } from '@/lib/api/surveyClient';
import { useRouter } from 'next/navigation';
import { QrCodeDialog } from '../qrCode';
import DrawerDemo from '@/components/forms/lists/answerList';
import { Badge } from '@/components/ui/badge';
import { StatsDrawer } from '@/components/survey/stats-drawer';

type SurveyStatus = 'all' | 'active' | 'draft' | 'completed';

export function ListSurvey() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<SurveyStatus>('all');
  const [isLoading, setIsLoading] = useState(true);
  const { handleDelete } = ButtonActions();
  const router = useRouter();
  const [selectedSurveyId, setSelectedSurveyId] = useState<string | null>(null);
  const [isStatsDrawerOpen, setIsStatsDrawerOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    userSurveys()
      .then(setSurveys)
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  const onDeleteSuccess = (deletedSurveyId: string) => {
    setSurveys((prev) => prev.filter((s) => s.id !== deletedSurveyId));
  };

  const handleStatsClick = (surveyId: string) => {
    setSelectedSurveyId(surveyId);
    setIsStatsDrawerOpen(true);
  };

  const filteredSurveys = surveys
    .filter((survey) => {
      if (statusFilter === 'all') return true;
      return survey.status === statusFilter;
    })
    .filter((survey) => survey.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      active: 'bg-green-100 text-green-800',
      draft: 'bg-gray-100 text-gray-800',
      completed: 'bg-blue-100 text-blue-800',
    };
    return <Badge className={statusStyles[status as keyof typeof statusStyles]}>{status}</Badge>;
  };

  if (isLoading) {
    return <div>Laden...</div>;
  }

  function handleEdit(id: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Umfrage suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <FunnelIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatusFilter('all')}>Alle</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('active')}>Aktiv</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('draft')}>Entwurf</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('completed')}>
                Abgeschlossen
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredSurveys.length} Umfragen gefunden
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Erstellt am</TableHead>
              <TableHead>Antworten</TableHead>
              <TableHead className="text-right">Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSurveys.map((survey) => (
              <TableRow key={survey.id}>
                <TableCell className="font-medium">{survey.name}</TableCell>
                <TableCell>{getStatusBadge(survey.status)}</TableCell>
                <TableCell>{new Date(survey.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <DrawerDemo surveyId={survey.id} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit(survey.id)}>
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <QrCodeDialog surveyId={survey.id}>
                      <Button variant="outline" size="icon">
                        <QrCodeIcon className="h-4 w-4" />
                      </Button>
                    </QrCodeDialog>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleStatsClick(survey.id)}
                    >
                      <ChartBarIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(survey.id, onDeleteSuccess)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <StatsDrawer
        surveyId={selectedSurveyId || ''}
        isOpen={isStatsDrawerOpen}
        onOpenChange={setIsStatsDrawerOpen}
      />
    </div>
  );
}
