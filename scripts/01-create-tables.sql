-- Create hashtags table
CREATE TABLE IF NOT EXISTS hashtags (
  id SERIAL PRIMARY KEY,
  tag VARCHAR(255) NOT NULL,
  year INTEGER NOT NULL,
  rank INTEGER NOT NULL,
  posts INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(tag, year)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_hashtags_year ON hashtags(year);
CREATE INDEX IF NOT EXISTS idx_hashtags_posts ON hashtags(posts DESC);
CREATE INDEX IF NOT EXISTS idx_hashtags_rank ON hashtags(rank);
