'use server'

import { revalidatePath, revalidateTag } from "next/cache"

export async function clearNextCache(_prevState: any, formData: FormData) {
  const tag = 'pokemon'
  revalidateTag(tag)
  return { success: true, tag }
}

export async function clearPathCache(_prevState: any, formData: FormData) {
  const path = formData.get('path')?.toString() || '/'
  console.log(`Clear path cache for ${path}`)
  revalidatePath(path)
  return { success: true, path }
}