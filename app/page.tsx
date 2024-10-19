import MovieGrid from '@/components/MovieGrid'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 bg-[#181A1B]">
      <h1 className="text-3xl font-bold mb-8 text-center">Icode Movies</h1>
      <MovieGrid />
    </main>
  )
}