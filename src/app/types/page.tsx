import { cookies } from "next/headers";
import { FetchCache } from "../FetchCache";
import { NextCache } from "../NextCache";
import { NoCache } from "../NoCache";
import { ReactCache } from "../ReactCache";

export const dynamic = 'force-dynamic'

export default function TypesPage() {
  cookies()
  return <>
    <h2>Dynamic types</h2>
    <NoCache />
    <FetchCache />
    <ReactCache />
    <NextCache />
  </>
}