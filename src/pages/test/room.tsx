import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { stringify } from "superjson";

export default function Backend() {
  const { data: firstData, isLoading: queryLoading } =
    api.user.getFirst.useQuery();

  if (queryLoading) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <div>BACKEND STUFF</div>
      {stringify(firstData)}
    </div>
  );
}
