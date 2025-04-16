"use client"

import { useEffect, useState, useRef } from "react"
import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import MovieGrid from "@/components/MovieGrid"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import tmdb from "@/lib/tmdb"
import { Typewriter } from "react-simple-typewriter"

interface Movie {
  id: number
  title: string
  overview: string
  backdrop_path: string
}

export default function Home() {
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [banners, setBanners] = useState<Movie[]>([])

  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await tmdb.get("/trending/movie/day", {
          params: { language: "en-US", page: 1 },
        })
        const moviesWithBackdrops = res.data.results.filter(
          (movie: Movie) => movie.backdrop_path
        )
        setBanners(moviesWithBackdrops.slice(5, 10))
      } catch (err) {
        console.error("Failed to fetch trending movies:", err)
      }
    }

    fetchTrending()
  }, [])

  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages))
  const handlePrev = () => setPage((prev) => Math.max(1, prev - 1))

  return (
    <>
      {/* Carousel Banner */}
      <div className="h-[50vh] md:h-[70vh] w-full overflow-hidden relative">
        <Carousel
          plugins={[plugin.current]}
          opts={{ loop: true }}
        // onMouseEnter={plugin.current.stop}
        // onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {banners.map((movie, index) => (
              <CarouselItem key={index} className="relative h-[50vh] md:h-[70vh] w-full">
                <Image
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title}
                  fill
                  className="object-cover brightness-75"
                  priority
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="bg-black/40 absolute inset-0 flex flex-col justify-center z-10">
          <div className="container mx-auto px-8">
            <span className="text-blue-400 text-5xl md:text-6xl font-bold">
              <Typewriter
                words={['Discover', 'Track', 'Watch']}
                loop={0} // 0 = infinite
                cursor
                cursorStyle="|"
                typeSpeed={100}
                deleteSpeed={60}
                delaySpeed={1000}
              />
            </span>
            <p className="text-base md:text-lg font-bold text-white max-w-2xl text-left">
              All in One Place with Spectra TV
            </p>
          </div>
        </div>
      </div>

      {/* Main Movie Grid */}
      <main className="container mx-auto px-8 pb-4">
        <MovieGrid
          headerText="Hot Trending Movies"
          endpoint={`trending/movie/day?language=en-US&page=${page}`}
          onPageData={({ totalPages }) => setTotalPages(totalPages)}
        />
        <div className="flex justify-center gap-4 mt-8">
          <Button onClick={handlePrev} disabled={page === 1}>Previous</Button>
          <span className="text-white self-center">Page {page} of {totalPages}</span>
          <Button onClick={handleNext} disabled={page >= totalPages}>Next</Button>
        </div>
      </main>
    </>
  )
}
