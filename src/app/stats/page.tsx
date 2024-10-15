import { FetchCache } from "../(components)/FetchCache";
import { NextCache } from "../(components)/NextCache";
import { NoCache } from "../(components)/NoCache";
import { ReactCache } from "../(components)/ReactCache";

// Since this page relies on data fetched from the api endpoints this app exposes, it cannot be rendered at build time
export const dynamic = 'force-dynamic'

export default function StatsPage() {
  return <>
    <NoCache info="STATS" />
    <ReactCache info="STATS" />
    <FetchCache info="STATS" />
    <NextCache info="STATS" />
  </>
}