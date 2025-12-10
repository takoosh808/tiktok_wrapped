import { sql } from "@vercel/postgres"

export interface HashtagData {
  tag: string
  year: number
  rank: number
  posts: number
}

export async function getAvailableYears(): Promise<number[]> {
  try {
    const { rows } = await sql.query("SELECT DISTINCT year FROM hashtags ORDER BY year DESC")
    return rows.map((row: any) => row.year)
  } catch (error) {
    console.error("[v0] Error fetching years:", error)
    return [2025, 2024, 2023, 2022, 2021, 2020, 2019]
  }
}

export async function getHashtagsByYear(year?: number): Promise<HashtagData[]> {
  try {
    let query = "SELECT tag, year, rank, posts FROM hashtags"
    const params: (string | number)[] = []

    if (year) {
      query += " WHERE year = $1"
      params.push(year)
    }

    query += " ORDER BY posts DESC LIMIT 100"

    const { rows } = await sql.query(query, params)
    return rows
  } catch (error) {
    console.error("[v0] Error fetching hashtags:", error)
    return []
  }
}

export async function getTrendData(hashtags: string[]): Promise<Array<{ year: number; tag: string; posts: number }>> {
  try {
    const query = "SELECT year, tag, posts FROM hashtags WHERE tag = ANY($1) ORDER BY year ASC, posts DESC"
    const { rows } = await sql.query(query, [hashtags])
    return rows
  } catch (error) {
    console.error("[v0] Error fetching trend data:", error)
    return []
  }
}

export async function getTotalPostsByYear(year?: number): Promise<number> {
  try {
    let query = "SELECT COALESCE(SUM(posts), 0) as total FROM hashtags"
    const params: (string | number)[] = []

    if (year) {
      query += " WHERE year = $1"
      params.push(year)
    }

    const { rows } = await sql.query(query, params)
    return Number(rows[0].total)
  } catch (error) {
    console.error("[v0] Error fetching total posts:", error)
    return 0
  }
}
