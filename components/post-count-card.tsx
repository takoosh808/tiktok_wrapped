"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Hashtag } from "@/lib/types"

interface PostCountCardProps {
  totalPosts: number
  topHashtag?: Hashtag
}

export function PostCountCard({ totalPosts, topHashtag }: PostCountCardProps) {
  return (
    <Card className="bg-slate-900/50 border-slate-800 col-span-1 lg:col-span-3">
      <CardHeader>
        <CardTitle>Post Count Summary</CardTitle>
        <CardDescription>Total posts and top performer</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-400 text-sm font-medium mb-3">Total Posts</p>
            <p className="text-4xl font-black bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              {(totalPosts / 1000).toFixed(0)}K
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-400 text-sm font-medium mb-3">Top Hashtag</p>
            <p className="text-3xl font-black text-pink-400">{topHashtag?.hashtag || "N/A"}</p>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-400 text-sm font-medium mb-3">Top Hashtag Posts</p>
            <p className="text-3xl font-black text-purple-400">{(topHashtag?.views || 0).toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
