import { type Prisma } from "@prisma/client";
import { type NextRouter } from "next/router";

export function dynamicRouteID(router: NextRouter): {
  shouldReturn: boolean;
  id: string;
} {
  if (!router.query) return { shouldReturn: true, id: "" };
  const { id } = router.query as { id: string };
  if (typeof id == "undefined") return { shouldReturn: true, id: "" };
  return { shouldReturn: false, id };
}

export function titleCase(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function stalsDBstringArray(json?: Prisma.JsonValue): string[] {
  if (json && typeof json === "object" && !Array.isArray(json)) {
    return json["values"] as string[];
  }

  return [];
}

export function notAuthenticated(status: string): boolean {
  return status !== "authenticated";
}
