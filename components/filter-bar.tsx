"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

interface FilterBarProps {
  selectedYear: number | null
  onYearChange: (year: number | null) => void
}

export function FilterBar({ selectedYear, onYearChange }: FilterBarProps) {
  const [availableYears, setAvailableYears] = useState<number[]>([2025, 2024, 2023, 2022, 2021, 2020, 2019])

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await fetch("/api/years")
        if (response.ok) {
          const years = await response.json()
          setAvailableYears(years)
        }
      } catch (error) {
        console.error("[v0] Error fetching available years:", error)
      }
    }

    fetchYears()
  }, [])

  return (
    <div className="flex flex-wrap gap-3 justify-center items-center">
      <span className="text-slate-300 font-semibold">Filter by year:</span>
      <Button
        variant={selectedYear === null ? "default" : "outline"}
        onClick={() => onYearChange(null)}
        className={selectedYear === null ? "bg-gradient-to-r from-pink-500 to-purple-500" : ""}
      >
        All Years
      </Button>
      {availableYears.map((year) => (
        <Button
          key={year}
          variant={selectedYear === year ? "default" : "outline"}
          onClick={() => onYearChange(year)}
          className={selectedYear === year ? "bg-gradient-to-r from-pink-500 to-purple-500" : ""}
        >
          {year}
        </Button>
      ))}
    </div>
  )
}
