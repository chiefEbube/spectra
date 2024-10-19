import Image from 'next/image'
import Link from 'next/link'

async function getMovie(id: string) {
  const url = `${process.env.TMDB_API_URL}/movie/${id}?language=en-US`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`
    }
  };

  const res = await fetch(url, options)
  if (!res.ok) {
    throw new Error('Failed to fetch movie')
  }
  const data = await res.json()
  return data
}

export default async function SingleMoviePage({ params }: { params: { id: string } }) {
  const movie = await getMovie(params.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="text-[#E3DFDA] hover:underline mb-4 inline-block">&larr; Back to movies</Link>
      <div className="bg-[#181A1B] rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            {movie.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            width={300}
            height={450}
            className="w-full h-64 object-cover"
          />
            ) : (
              <div className="w-full h-96 md:w-48 bg-[#181A1B] flex items-center justify-center">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
          </div>
          <div className="p-8">
            <h1 className="text-2xl font-bold mb-2 text-[#E3DFDA]">{movie.original_title}</h1>
            <p className="text-[#d1d0d0] mb-4">
              {movie.release_date}
            </p>
            {movie.overview ? (
              <p className="text-[#E3DFDA]">{movie.overview}</p>
            ) : (
              <p className="text-[#E3DFDA]">No description available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}