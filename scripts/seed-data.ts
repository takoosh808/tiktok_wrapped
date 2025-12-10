import fs from "fs"
import path from "path"
import { createPool } from "@vercel/postgres"

const pool = createPool({
  connectionString: process.env.DATABASE_URL,
})

async function seedDatabase() {
  const client = await pool.connect()

  try {
    console.log("[v0] Starting database seed...")

    // Read CSV file
    const csvPath = path.join(process.cwd(), "public", "tiktok-trending-hashtags.csv")
    const fileContent = fs.readFileSync(csvPath, "utf-8")
    const lines = fileContent.split("\n").slice(1) // Skip header

    let insertedCount = 0

    for (const line of lines) {
      if (!line.trim()) continue

      const [tag, year, rank, posts] = line.split(",")

      try {
        await client.query(
          "INSERT INTO hashtags (tag, year, rank, posts) VALUES ($1, $2, $3, $4) ON CONFLICT (tag, year) DO UPDATE SET posts = $4, rank = $3",
          [tag.trim(), Number.parseInt(year), Number.parseInt(rank), Number.parseInt(posts)],
        )
        insertedCount++
      } catch (err) {
        console.error(`[v0] Error inserting row: ${line}`, err)
      }
    }

    console.log(`[v0] Successfully inserted ${insertedCount} records`)
  } finally {
    client.release()
    pool.end()
  }
}

seedDatabase().catch(console.error)
