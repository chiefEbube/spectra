"use client"

import Image from "next/image"
import Link from "next/link"
import { Search, Film, Ticket, CalendarDays } from "lucide-react"
import { useEffect, useState } from "react"

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-black/90 backdrop-blur-sm" : "bg-gradient-to-b from-black/80 to-transparent"}`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and App Info */}
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/images/logo.png" alt="Logo" width={150} height={150} className="h-10 w-auto" />
              </Link>

              <div className="hidden md:block text-sm text-white/70">
                <p>Discover the latest Hollywood movies</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-sm font-medium text-white hover:text-blue-400 transition-colors flex items-center gap-1"
              >
                <Film className="h-4 w-4" />
                <span>Now Playing</span>
              </Link>
              <Link
                href="/coming-soon"
                className="text-sm font-medium text-white/70 hover:text-blue-400 transition-colors flex items-center gap-1"
              >
                <CalendarDays className="h-4 w-4" />
                <span>Coming Soon</span>
              </Link>
              <Link
                href="/tickets"
                className="text-sm font-medium text-white/70 hover:text-blue-400 transition-colors flex items-center gap-1"
              >
                <Ticket className="h-4 w-4" />
                <span>Tickets</span>
              </Link>
            </nav>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search movies..."
                className="w-full md:w-64 bg-white/10 border border-white/20 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </header>
      <div className="h-16"></div>
    </>
  )
}
