import { Movie } from '@/types/movie';
import { use } from 'react'
import MovieCard from './MovieCard'

async function getMovies() {
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

export default function MovieGrid() {
  const movies = use(getMovies())

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies?.map((movie: Movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}