import { getAvailableYears } from "@/lib/db"

export async function GET() {
  try {
    const years = await getAvailableYears()
    return Response.json(years)
  } catch (error) {
    console.error("[v0] Error fetching years:", error)
    return Response.json([2025, 2024, 2023, 2022, 2021, 2020, 2019])
  }
}
