"use server"

import { Movie } from "@/types/movie"
import tmdb from "@/lib/tmdb";

export async function getMovies(endpoint: string): Promise<{ results: Movie[]; total_pages: number }> {
  try {
    const res = await tmdb.get(`/${endpoint}`)
    return {
      results: res.data.results,
      total_pages: res.data.total_pages,
    }
  } catch (err) {
    console.error("getMovies error:", err)
    throw new Error("Failed to fetch movies")
  }
}

export async function getMovie(id: string) {
  try {
    const res = await tmdb.get(`/movie/${id}`, {
      params: { language: "en-US" },
    })
    return res.data
  } catch (err) {
    console.error("getMovie error:", err)
    throw new Error("Failed to fetch movie")
  }
}

export async function getWatchProviders(movieId: string) {
  try {
    const res = await tmdb.get(`/movie/${movieId}/watch/providers`)
    return res.data.results?.US || null
  } catch (err) {
    console.error("getWatchProviders error:", err)
    throw new Error("Failed to fetch watch providers")
  }
}

export async function getMovieTrailer(id: string) {
  try {
    const res = await tmdb.get(`/movie/${id}/videos`, {
      params: { language: "en-US" },
    })
    return res.data.results[0] || null
  } catch (err) {
    console.error("getMovieTrailer error:", err)
    throw new Error("Failed to fetch trailer")
  }
}

export async function getCast(id: string) {
  try {
    const res = await tmdb.get(`/movie/${id}/credits`, {
      params: { language: "en-US" },
    })
    return res.data.cast
  } catch (err) {
    console.error("getCast error:", err)
    throw new Error("Failed to fetch cast")
  }
}

export async function getReviews(id: string) {
  try {
    const res = await tmdb.get(`/movie/${id}/reviews`, {
      params: { language: "en-US", page: 1 },
    })
    return res.data.results
  } catch (err) {
    console.error("getReviews error:", err)
    throw new Error("Failed to fetch reviews")
  }
}

export async function getRecommendations(id: string) {
  try {
    const res = await tmdb.get(`/movie/${id}/recommendations`, {
      params: { language: "en-US", page: 1 },
    })
    return res.data.results
  } catch (err) {
    console.error("getRecommendations error:", err)
    throw new Error("Failed to fetch recommendations")
  }
}
