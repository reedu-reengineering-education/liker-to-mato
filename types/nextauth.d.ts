import { User } from "next-auth";
import { Survey } from "@prisma/client";
import { JWT } from "next-auth/jwt";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    survey: SurveyId;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      survey: SurveyId;
    };
  }
}
// type SurveyId = string;

// declare module "next-auth/jwt" {
//   interface JWT {
//     id: SurveyId;
//   }
// }

// declare module "next-auth" {
//   interface Session {
//     user: Survey & {
//       id: SurveyId;
//     };
//   }
// }
