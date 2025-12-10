import { getHashtagsByYear, getTrendData, getTotalPostsByYear } from "@/lib/db"
import type { WrappedData } from "@/lib/types"

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const year = url.searchParams.get("year") ? Number.parseInt(url.searchParams.get("year")!) : undefined

    const hashtags = await getHashtagsByYear(year)
    const totalPosts = await getTotalPostsByYear(year)

    if (hashtags.length === 0) {
      return Response.json({ error: "No data available for the selected year" }, { status: 404 })
    }

    // Get top hashtags
    const topHashtagNames = hashtags.slice(0, 5).map((h) => h.tag)
    const trendData = await getTrendData(topHashtagNames)

    // Transform hashtag data to match frontend expectations
    const transformedHashtags = hashtags.map((h) => ({
      hashtag: h.tag,
      views: h.posts * 10, // Estimated views based on posts
      likes: h.posts * 2,
      reposts: h.posts * 0.5,
      posts: h.posts,
      year: h.year,
    }))

    const wrappedData: WrappedData = {
      totalPosts,
      totalViews: totalPosts * 10,
      totalLikes: totalPosts * 2,
      totalReposts: totalPosts * 0.5,
      topHashtags: {
        mostViewed: transformedHashtags.slice(0, 5),
        mostReposted: transformedHashtags.slice(0, 5).sort((a, b) => b.reposts - a.reposts),
        mostLiked: transformedHashtags.slice(0, 5).sort((a, b) => b.likes - a.likes),
      },
      trendData,
    }

    return Response.json(wrappedData)
  } catch (error) {
    console.error("[v0] Error fetching analytics:", error)
    return Response.json({ error: "Failed to fetch analytics data" }, { status: 500 })
  }
}
