export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  RESEARCHER = "RESEARCHER",
}

export interface Permission {
  action: string;
  subject: string;
}

export const rolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.USER]: [
    { action: "read", subject: "survey" },
    { action: "create", subject: "response" },
  ],
  [UserRole.RESEARCHER]: [
    { action: "read", subject: "survey" },
    { action: "create", subject: "survey" },
    { action: "update", subject: "survey" },
    { action: "delete", subject: "survey" },
    { action: "read", subject: "response" },
    { action: "export", subject: "response" },
  ],
  [UserRole.ADMIN]: [{ action: "*", subject: "*" }],
};
