'use client'

import { useFormState } from "react-dom";
import { ClearCacheButton } from "./ClearCacheButton";
import { clearPathCache } from "./ClearCache.actions"
import { usePathname } from "next/navigation";

export function ClearPathCacheForm() {
  const pathName = usePathname()

  const [_state, action] = useFormState(clearPathCache, { success: false, path: '' })

  return <form action={action}>
    <input type="hidden" name="path" value={pathName} />
    <ClearCacheButton>Clear path cache</ClearCacheButton>
  </form>
}