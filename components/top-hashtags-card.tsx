"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Hashtag } from "@/lib/types"

interface TopHashtagsCardProps {
  title: string
  hashtags: Hashtag[]
  metric: "views" | "likes" | "reposts"
}

export function TopHashtagsCard({ title, hashtags, metric }: TopHashtagsCardProps) {
  const getMetricValue = (hashtag: Hashtag) => {
    switch (metric) {
      case "views":
        return hashtag.views
      case "likes":
        return hashtag.likes
      case "reposts":
        return hashtag.reposts
      default:
        return 0
    }
  }

  const getMetricLabel = () => {
    switch (metric) {
      case "views":
        return "Views"
      case "likes":
        return "Likes"
      case "reposts":
        return "Reposts"
    }
  }

  const getMetricColor = () => {
    switch (metric) {
      case "views":
        return "text-blue-400"
      case "likes":
        return "text-pink-400"
      case "reposts":
        return "text-purple-400"
    }
  }

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{getMetricLabel()}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {hashtags.slice(0, 5).map((hashtag, index) => (
            <div key={hashtag.hashtag} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 border border-slate-700">
                  <span className="text-sm font-bold text-slate-300">#{index + 1}</span>
                </div>
                <span className="font-semibold text-slate-200">{hashtag.hashtag}</span>
              </div>
              <span className={`font-bold ${getMetricColor()}`}>{(getMetricValue(hashtag) / 1000).toFixed(1)}K</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
