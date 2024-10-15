import { FetchCache } from "./(components)/FetchCache"
import { NextCache } from "./(components)/NextCache"
import { NoCache } from "./(components)/NoCache"
import { ReactCache } from "./(components)/ReactCache"

// Since this page relies on data fetched from the api endpoints this app exposes, it cannot be rendered at build time
export const dynamic = 'force-dynamic'

export default async function Home() {
  return <>
    <h2>Your favorite POCemon team</h2>
    <NoCache info="NAME" />
    <ReactCache info="NAME" />
    <FetchCache info="NAME" />
    <NextCache info="NAME" />
  </>
}
