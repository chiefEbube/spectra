import { Movie } from "@/types/movie";

export async function getMovies(): Promise<Movie[]> {
    const url = `${process.env.TMDB_API_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
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