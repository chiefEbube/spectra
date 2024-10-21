import MovieGrid from '@/components/MovieGrid'
import Hero from '@/public/images/hero.png'

export default function Home() {
  return (
    <>
      <header className='h-[50vh] md:h-[70vh]' style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${Hero.src})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover"
        }}>
      </header>
      <main className="container mx-auto px-8 pb-4">
        <MovieGrid headerText="Popular Movies" endpoint="movie/popular?language=en-US&page=1" />
        <MovieGrid headerText="Top Rated" endpoint="movie/top_rated?language=en-US&page=1" />
        <MovieGrid headerText="Upcoming" endpoint="movie/upcoming?language=en-US&page=1" />
      </main>

    </>
  )
}