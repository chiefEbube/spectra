import MovieCard from '@/components/MovieCard';
import MovieGrid from '@/components/MovieGrid';
import { Movie } from '@/types/movie';
import Image from 'next/image'
import Link from 'next/link'
import { getCast, getMovie, getMovieTrailer, getRecommendations, getReviews, getWatchProviders } from '../actions/movieActions';

export default async function SingleMoviePage({ params }: { params: { id: string } }) {
  const movie = await getMovie(params.id)
  const providers = await getWatchProviders(params.id)
  const trailer = await getMovieTrailer(params.id)
  const cast = await getCast(params.id)
  const reviews = await getReviews(params.id)
  const recommendations = await getRecommendations(params.id)

  return (
    <div className="container mx-auto px-8 py-8">
      <Link href="/" className="text-blue-400 hover:underline mb-4 inline-block">&larr; Back to movies</Link>
      <div className="h-[85vh]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,1)), url(${`https://image.tmdb.org/t/p/w500/${movie.poster_path}`})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
      >
        <div className='flex flex-col md:flex-row gap-12 items-center'>
          <div className="w-[350px] md:w-[400px] lg:w-[450px] h-auto max-h-[85vh] flex items-center justify-center overflow-hidden">
            {movie.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                width={450}
                height={675}
                className="object-cover w-full h-auto"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800">
                <span className="text-white">No image available</span>
              </div>
            )}
          </div>
          <div className="py-8 md:w-1/3">
            <h1 className="text-4xl font-bold mb-1 text-white">{movie.original_title}</h1>
            <p className="text-[#d1d0d0] mb-4 text-sm font-bold">
              Release date: {new Date(movie.release_date).toDateString()}
            </p>
            {movie.overview ? (
              <>
                <h2 className="text-sm font-semibold text-blue-400 mb-1">Overview:</h2>
                <p className="text-white text-base">{movie.overview}</p>
              </>
            ) : (
              <p className="text-[#E3DFDA]">No description available.</p>
            )}

            {providers ? (
              <div className="mt-6">
                <h2 className="text-sm font-semibold text-blue-400 mb-2">Available on:</h2>
                <div className="flex flex-wrap gap-1">
                  {providers.flatrate?.map((p: any) => (
                    <div key={p.provider_name} className="flex flex-col w-20 text-start">
                      <Image
                        src={`https://image.tmdb.org/t/p/w45${p.logo_path}`}
                        alt={p.provider_name}
                        width={45}
                        height={45}
                        className="mb-1 rounded"
                      />
                      <span className="text-[10px] text-white">{p.provider_name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-[#E3DFDA] mt-4">No watch providers available.</p>
            )
            }
          </div>
        </div>

      </div>

      {/* Trailer Section */}
      {
        trailer ? (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-[#E3DFDA] mb-2">Watch Trailer</h2>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={`Trailer for ${movie.title}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ) : (
          <p className="text-[#E3DFDA] mt-4">No trailer available.</p>
        )
      }

      {/* Cast Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-[#E3DFDA] mb-4">Popular Cast</h2>
        <div className="flex flex-wrap gap-4">
          {cast.length > 0 ? (
            cast.slice(0, 8).map((actor: any) => (
              <div key={actor.id} className="text-center">
                {actor.profile_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                    alt={actor.name}
                    width={100}
                    height={150}
                    className="rounded-lg"
                  />
                ) : (
                  <div className="w-24 h-36 bg-gray-400 flex items-center justify-center">
                    <span className="text-white">No image</span>
                  </div>
                )}
                <p className="text-[#E3DFDA] mt-2 text-sm">{actor.name}</p>
              </div>
            ))
          ) : (
            <p className="text-[#E3DFDA]">No cast information available.</p>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-[#E3DFDA] mb-4">Reviews ({reviews.length})</h2>
        {reviews.length > 0 ? (
          reviews.map((review: any) => (
            <div key={review.id} className="mb-4">
              <h3 className="text-lg text-[#E3DFDA] font-semibold">{review.author}</h3>
              <p className="text-[#E3DFDA] text-xs">{review.content}</p>
            </div>
          ))
        ) : (
          <p className="text-[#E3DFDA] text-xs">No reviews available.</p>
        )}
      </div>

      {/* Recommendations Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-[#E3DFDA] mb-4">You may also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {recommendations.length > 0 ? (
            recommendations.slice(0, 12).map((movie: Movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <p className="text-[#E3DFDA]">No recommendations available.</p>
          )}
        </div>
      </div>
    </div >
  )
}
