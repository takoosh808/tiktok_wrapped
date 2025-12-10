"use client"

import { useState, useEffect } from "react"
import { TopHashtagsCard } from "@/components/top-hashtags-card"
import { HashtagTrendChart } from "@/components/hashtag-trend-chart"
import { PostCountCard } from "@/components/post-count-card"
import { FilterBar } from "@/components/filter-bar"
import type { WrappedData } from "@/lib/types"

export default function Home() {
  const [data, setData] = useState<WrappedData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedYear, setSelectedYear] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/analytics?${selectedYear ? `year=${selectedYear}` : ""}`)
        if (!response.ok) throw new Error("Failed to fetch data")
        const wrappedData = await response.json()
        setData(wrappedData)
      } catch (err) {
        setError("Unable to load analytics data. Please try again.")
        console.error("[v0] Error fetching data:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [selectedYear])

  const handleYearChange = (year: number | null) => {
    setSelectedYear(year)
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4" />
          <p className="text-slate-300">Loading analytics...</p>
        </div>
      </main>
    )
  }

  if (error || !data) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-400 mb-6">{error}</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
            TikTok Hashtag
            <span className="block bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Analytics
            </span>
          </h1>
          <p className="text-xl text-slate-300">Discover trending hashtags and performance metrics</p>
        </div>

        <FilterBar selectedYear={selectedYear} onYearChange={handleYearChange} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TopHashtagsCard title="Top Hashtags" hashtags={data.topHashtags.mostViewed} metric="views" />
          <div className="lg:col-span-2">
            <HashtagTrendChart data={data.trendData} />
          </div>
        </div>

        <PostCountCard totalPosts={data.totalPosts} topHashtag={data.topHashtags.mostViewed[0]} />
      </div>
    </main>
  )
}
