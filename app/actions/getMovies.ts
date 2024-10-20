'use server'

import { Movie } from "@/types/movie";

export async function getMovies(endpoint: string): Promise<Movie[]> {
    const url = `${process.env.TMDB_API_URL}/${endpoint}`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`
      }
    };
  
    const res = await fetch(url, options)
    if (!res.ok) {
      throw new Error('Failed to fetch movies')
    }
    const data = await res.json()
    return data.results
  }