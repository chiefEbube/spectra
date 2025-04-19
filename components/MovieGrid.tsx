'use client'

import { useState, useEffect } from 'react';
import { Movie } from '@/types/movie';
import MovieCard from './MovieCard'
import Loading from '@/app/loading';
import { getMovies } from '@/app/actions/movieActions';

interface MovieGridProps {
  headerText: string;
  endpoint: string;
  onPageData?: (info: { totalPages: number }) => void
}


export default function MovieGrid({headerText, endpoint, onPageData} : MovieGridProps) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMovies() {
      setIsLoading(true)
      try {
        const { results, total_pages } = await getMovies(endpoint)
        setMovies(results)
        onPageData?.({ totalPages: total_pages })
      } catch (error) {
        setError("Failed to fetch movies")
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovies()
  }, [endpoint, onPageData])

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="space-y-4 my-16">
      <div className='flex items-center justify-between mb-2'>
        <h1 className='text-[#E3DFDA] font-bold text-lg md:text-xl border-l-4 border-blue-400 pl-4'>{headerText}</h1>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4
       sm:gap-10">
        {movies.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}