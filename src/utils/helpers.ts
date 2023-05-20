import { type NextRouter } from "next/router";

export function dynamicRouteID(router: NextRouter) {
  if (!router.query) return { shouldReturn: true, id: "" };
  const { id } = router.query as { id: string };
  if (typeof id == "undefined") return { shouldReturn: true, id: "" };
  return { shouldReturn: false, id };
}

export function titleCase(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
