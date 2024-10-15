'use client'

import { useFormStatus } from "react-dom"

export function ClearCacheButton() {
  const { pending } = useFormStatus()

  return <>
    <button type="submit" className="bg-neutral-800 hover:bg-neutral-700 text-yellow-600 font-bold py-2 px-4 rounded mt-2" disabled={pending}>Clear Next cache</button>
  </>
}