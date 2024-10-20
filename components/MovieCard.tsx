import { Movie } from '@/types/movie'
import Image from 'next/image'
import Link from 'next/link'

interface MovieProps {
    movie: Movie
}

export default function MovieCard({ movie} : MovieProps) {
  return (
    <Link href={`/${movie.id}`} className="block">
      <div className="bg-[#181A1B] rounded-lg shadow-lg shadow-[#000000] overflow-hidden transition-transform duration-200 ease-in-out hover:scale-105">
        {movie.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            width={300}
            height={450}
            className="w-full h-64 object-cover"
          />
        ) : (
          <div className="w-full h-64 bg-[#181A1B] flex items-center justify-center">
            <span className="text-[#E3DFDA]">No image available</span>
          </div>
        )}
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2 truncate text-[#E3DFDA]">{movie.title}</h2>
          <p className="text-sm text-[#E3DFDA]">Release Date:{` `}
            {movie.release_date ? new Date(movie.release_date).toDateString() : 'Release date unknown'}
          </p>
        </div>
      </div>
    </Link>
  )
}