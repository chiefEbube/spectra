import MovieGrid from '@/components/MovieGrid'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 bg-[#181A1B]">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#E3DFDA]">Icode Movies</h1>
      <MovieGrid headerText="Popular Movies" endpoint="movie/popular?language=en-US&page=1"/>
      <MovieGrid headerText="Top Rated" endpoint="movie/top_rated?language=en-US&page=1"/>
      <MovieGrid headerText="Upcoming" endpoint="movie/upcoming?language=en-US&page=1"/>
    </main>
  )
}