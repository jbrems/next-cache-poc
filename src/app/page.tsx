import { NextCache } from "./NextCache"
import { NoCache } from "./NoCache"
import { ReactCache } from "./ReactCache"

export default async function Home() {
  return <>
    <h1>Next cache POC</h1>
    <h2>Your favorite POCemon team</h2>
    <NoCache />
    <ReactCache />
    <NextCache />
  </>
}
