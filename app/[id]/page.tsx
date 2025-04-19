import MovieCard from "@/components/MovieCard"
import type { Movie } from "@/types/movie"
import Image from "next/image"
import Link from "next/link"
import {
  getCast,
  getMovie,
  getMovieTrailer,
  getRecommendations,
  getReviews,
  getWatchProviders,
} from "../actions/movieActions"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export default async function SingleMoviePage({ params }: { params: { id: string } }) {
  const movie = await getMovie(params.id)
  const providers = await getWatchProviders(params.id)
  const trailer = await getMovieTrailer(params.id)
  const cast = await getCast(params.id)
  const reviews = await getReviews(params.id)
  const recommendations = await getRecommendations(params.id)

  return (
    <div className="container mx-auto px-8 py-8">
      <Link href="/" className="text-blue-400 hover:underline mb-4 inline-block">
        &larr; Back to movies
      </Link>
     {/* Hero Section with Background */}
     <div
        className="min-h-[50vh] md:min-h-[60vh] lg:min-h-[70vh] rounded-sm overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,1)), url(${`https://image.tmdb.org/t/p/w500/${movie.poster_path}`})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="flex flex-col md:flex-row p-4 md:p-8 gap-6 md:gap-8 lg:gap-12">
          {/* Movie Poster */}
          <div className="w-full md:w-1/3 lg:w-1/4 mx-auto md:mx-0 max-w-[300px]">
            {movie.poster_path ? (
              <div className="rounded-lg overflow-hidden shadow-lg border border-gray-800">
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  width={450}
                  height={675}
                  className="object-cover w-full h-auto"
                  priority
                />
              </div>
            ) : (
              <div className="w-full aspect-[2/3] flex items-center justify-center bg-gray-800 rounded-lg">
                <span className="text-white">No image available</span>
              </div>
            )}
          </div>

          {/* Movie Details */}
          <div className="flex-1 py-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white">{movie.original_title}</h1>
            <p className="text-[#d1d0d0] mb-4 text-sm font-medium">
              Release date: {new Date(movie.release_date).toDateString()}
            </p>

            {movie.overview ? (
              <div className="space-y-2">
                <h2 className="text-sm font-semibold text-blue-400">Overview:</h2>
                <p className="text-white text-sm md:text-base">{movie.overview}</p>
              </div>
            ) : (
              <p className="text-[#E3DFDA]">No description available.</p>
            )}

            {/* Watch Providers */}
            {providers && providers.flatrate?.length > 0 ? (
              <div className="mt-6">
                <h2 className="text-sm font-semibold text-blue-400 mb-2">Available on:</h2>
                <div className="flex flex-wrap gap-2">
                  {providers.flatrate?.map((p: any) => (
                    <div key={p.provider_name} className="flex flex-col items-center w-16 sm:w-20">
                      <div className="rounded-md overflow-hidden border border-gray-700">
                        <Image
                          src={`https://image.tmdb.org/t/p/w45${p.logo_path}`}
                          alt={p.provider_name}
                          width={45}
                          height={45}
                          className="w-full h-auto"
                        />
                      </div>
                      <span className="text-[10px] text-white text-center mt-1">{p.provider_name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-[#E3DFDA] mt-4 text-sm">No watch providers available.</p>
            )}
          </div>
        </div>
      </div>

      {/* Trailer Section */}
      {trailer ? (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-[#E3DFDA] mb-2">Watch Trailer</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={`Trailer for ${movie.title}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      ) : (
        <p className="text-[#E3DFDA] mt-4">No trailer available.</p>
      )}

      {/* Cast Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-[#E3DFDA] mb-4">Popular Cast</h2>
        <div className="relative">
          {/* Left gradient indicator (visible when scrolled) */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none opacity-0 group-scrolled:opacity-100" />

          {/* Right gradient indicator */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          {/* Left arrow indicator */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center z-20 opacity-0 group-scrolled:opacity-80 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </div>

          {/* Right arrow indicator */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center z-20 opacity-80 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </div>

          <ScrollArea className="w-full group">
            <div className="flex space-x-4 pb-4">
              {cast.length > 0 ? (
                cast.slice(0, 12).map((actor: any) => (
                  <div key={actor.id} className="text-center shrink-0">
                    {actor.profile_path ? (
                      <div className="w-24 h-36 overflow-hidden rounded-lg">
                        <Image
                          src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                          alt={actor.name}
                          width={96}
                          height={144}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-36 bg-gray-800 flex items-center justify-center rounded-lg">
                        <span className="text-white text-xs">No image</span>
                      </div>
                    )}
                    <p className="text-[#E3DFDA] mt-2 text-xs font-medium truncate w-24">{actor.name}</p>
                    <p className="text-[#a0a0a0] text-xs truncate w-24">{actor.character}</p>
                  </div>
                ))
              ) : (
                <p className="text-[#E3DFDA]">No cast information available.</p>
              )}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-[#E3DFDA] mb-4">Reviews ({reviews.length})</h2>
        {reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.slice(0, 3).map((review: any) => (
              <div key={review.id} className="bg-gray-900 p-4 rounded-lg">
                <h3 className="text-lg text-[#E3DFDA] font-semibold">{review.author}</h3>
                <p className="text-[#E3DFDA] text-sm mt-2">
                  {review.content.length > 300 ? `${review.content.substring(0, 300)}...` : review.content}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#E3DFDA]">No reviews available.</p>
        )}
      </div>

      {/* Recommendations Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-[#E3DFDA] mb-4">You may also like</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-10">
          {recommendations.length > 0 ? (
            recommendations.slice(0, 12).map((movie: Movie) => <MovieCard key={movie.id} movie={movie} />)
          ) : (
            <p className="text-[#E3DFDA]">No recommendations available.</p>
          )}
        </div>
      </div>
    </div>
  )
}
