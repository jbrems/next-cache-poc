'use client'

import { useFormState } from "react-dom";
import { ClearCacheButton } from "./ClearCacheButton";
import { clearNextCache } from "./ClearCache.actions"

export function ClearNextjsCacheForm() {
  const [_state, action] = useFormState(clearNextCache, { success: false, tag: '' })

  return <form action={action}>
    <ClearCacheButton>Clear Nextjs cache</ClearCacheButton>
  </form>
}