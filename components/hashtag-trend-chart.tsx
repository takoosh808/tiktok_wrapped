"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface TrendDataPoint {
  year: number
  hashtag: string
  posts: number
}

interface HashtagTrendChartProps {
  data: TrendDataPoint[]
}

export function HashtagTrendChart({ data }: HashtagTrendChartProps) {
  const trendByYear = data.reduce(
    (acc, point) => {
      const existing = acc.find((item) => item.year === point.year)
      if (existing) {
        existing.posts += point.posts
      } else {
        acc.push({ year: point.year, posts: point.posts })
      }
      return acc
    },
    [] as { year: number; posts: number }[],
  )

  trendByYear.sort((a, b) => a.year - b.year)

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader>
        <CardTitle>Hashtag Trend Over Time</CardTitle>
        <CardDescription>Total posts by year</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendByYear}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="year" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #475569",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#e2e8f0" }}
            />
            <Line
              type="monotone"
              dataKey="posts"
              stroke="#ec4899"
              strokeWidth={3}
              dot={{ fill: "#ec4899", r: 5 }}
              activeDot={{ r: 7 }}
              name="Posts"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
