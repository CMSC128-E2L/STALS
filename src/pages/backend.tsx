import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { stringify } from "superjson";


export default function Backend() {
    // const createduser = api.user.createUser.useQuery();
    // const createUser = api.user.createUser.useQuery();
    const getfirst = api.user.getFirst.useQuery();

    return (
        <div>
            <div>BACKEND STUFF</div>
            {stringify(getfirst.data)}
        </div>
    );
}