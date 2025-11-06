import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    const formData = await req.formData()
    const file = formData.get("file") as any
    const testId = String(formData.get("testId") || "misc")

    if (!file || !file.name) return NextResponse.json({ error: "No file" }, { status: 400 })

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_")
    const path = `${testId}/${Date.now()}_${safeName}`

    const { error: uploadError } = await supabase.storage.from("test-images").upload(path, buffer, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || "application/octet-stream",
    })

    if (uploadError) {
      console.error("Upload error (server):", uploadError)
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }

    const { data: publicData } = supabase.storage.from("test-images").getPublicUrl(path)
    return NextResponse.json({ publicUrl: (publicData as any).publicUrl })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
