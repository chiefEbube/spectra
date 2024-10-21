'use client'

import { useState, useEffect } from 'react';
import { Movie } from '@/types/movie';
import MovieCard from './MovieCard'
import { getMovies } from '@/app/actions/getMovies';
import Loading from '@/app/loading';
import { Button } from './ui/button';

interface MovieGridProps {
  headerText: string;
  endpoint: string;
}


export default function MovieGrid({headerText, endpoint} : MovieGridProps) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    async function fetchMovies() {
      try {
        const fetchedMovies = await getMovies(endpoint)
        setMovies(fetchedMovies)
      } catch (error) {
        setError("Failed to fetch movies")
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovies()
  }, [])

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  const displayedMovies = showAll ? movies : movies.slice(0, 4)

  return (
    <div className="space-y-4 my-16">
      <div className='flex items-center justify-between mb-2'>
        <h1 className='text-[#E3DFDA] font-bold text-lg md:text-xl border-l-4 border-blue-400 pl-4'>{headerText}</h1>
      {movies.length > 4 && (
          <Button onClick={toggleShowAll} className='text-[#E3DFDA] font-bold shadow-lg shadow-blue-400 hover:scale-95'>
            {showAll ? "Show Less" : "Show All"}
          </Button>
      )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {displayedMovies.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}