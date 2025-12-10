export interface Hashtag {
  hashtag: string
  views: number
  likes: number
  reposts: number
  posts?: number
  year?: number
}

export interface WrappedData {
  totalPosts: number
  totalViews: number
  totalLikes: number
  totalReposts: number
  topHashtags: {
    mostViewed: Hashtag[]
    mostReposted: Hashtag[]
    mostLiked: Hashtag[]
  }
  trendData: Array<{ year: number; hashtag: string; posts: number }>
}
