'use client'

import { useFormState } from "react-dom";
import { ClearCacheButton } from "./ClearCacheButton";
import { clearNextCache } from "./ClearCacheButton.actions"

export function ClearCacheForm() {
  const [state, action] = useFormState(clearNextCache, { success: false })

  return <form action={action}>
    <ClearCacheButton />
  </form>
}