'use server'

import { revalidateTag } from "next/cache"

export async function clearNextCache(prevState: any, formData: FormData) {
  revalidateTag('pokemon')
  return { success: true }
}