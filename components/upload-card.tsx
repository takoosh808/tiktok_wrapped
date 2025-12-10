"use client"

import type React from "react"

import { useState } from "react"
import { Upload } from "lucide-react"

interface UploadCardProps {
  onFileSelect: (file: File) => void
  isLoading?: boolean
}

export function UploadCard({ onFileSelect, isLoading = false }: UploadCardProps) {
  const [isDragActive, setIsDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(e.type === "dragenter" || e.type === "dragover")
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0] && files[0].type === "text/csv") {
      onFileSelect(files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files && files[0]) {
      onFileSelect(files[0])
    }
  }

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${
        isDragActive
          ? "border-purple-500 bg-purple-500/10"
          : "border-slate-700 hover:border-slate-600 hover:bg-slate-800/30"
      } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="p-3 bg-purple-500/20 rounded-full">
          <Upload className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <p className="text-white font-semibold">Drop your CSV file here</p>
          <p className="text-slate-400 text-sm">or click to browse</p>
        </div>
      </div>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileInput}
        disabled={isLoading}
        className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
      />
    </div>
  )
}
