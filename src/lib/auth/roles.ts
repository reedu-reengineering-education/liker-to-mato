export enum UserRole {
  RESEARCHER = 'RESEARCHER',
}

// Einfache Berechtigungsstruktur für Researcher
export interface Permission {
  action: string;
  subject: string;
}

// Alle Berechtigungen für Researcher
export const rolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.RESEARCHER]: [
    { action: '*', subject: '*' }, // Voller Zugriff für Researcher
  ],
};
