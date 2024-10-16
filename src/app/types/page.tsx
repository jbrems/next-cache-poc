import { FetchCache } from "../cache/FetchCache";
import { NextCache } from "../cache/NextCache";
import { NoCache } from "../cache/NoCache";
import { ReactCache } from "../cache/ReactCache";

// Since this page relies on data fetched from the api endpoints this app exposes, it cannot be rendered at build time
export const dynamic = 'force-dynamic'

export default function TypesPage() {
  return <>
    <NoCache info="TYPES" />
    <ReactCache info="TYPES" />
    <FetchCache info="TYPES" />
    <NextCache info="TYPES" />
  </>
}