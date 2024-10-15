import { FetchCache } from "../FetchCache";
import { NextCache } from "../NextCache";
import { NoCache } from "../NoCache";
import { ReactCache } from "../ReactCache";

export default function StatsPage() {
  return <>
    <h2>Stats</h2>
    <NoCache />
    <FetchCache />
    <ReactCache />
    <NextCache />
  </>
}