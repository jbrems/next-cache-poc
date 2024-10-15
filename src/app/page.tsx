import { FetchCache } from "./FetchCache"
import { NextCache } from "./NextCache"
import { NoCache } from "./NoCache"
import { ReactCache } from "./ReactCache"

export default async function Home() {
  return <>
    <h2>Your favorite POCemon team</h2>
    <NoCache />
    <FetchCache />
    <ReactCache />
    <NextCache />
  </>
}
