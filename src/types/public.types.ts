export interface HttpError extends Error {
  status?: number
}

export interface ENV {
  PORT: number | undefined
  MONGO_URI: string | undefined
}
