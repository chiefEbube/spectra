import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-blue-400 bg-opacity-20">
        <div className="container mx-auto px-4 py-4">
            <Link href="/" className="text-white font-extrabold text-xl md:text-3xl"><span className="text-blue-400">icode</span> movies</Link>
        </div>
    </nav>
  )
}