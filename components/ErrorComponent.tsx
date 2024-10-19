import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function ErrorComponent({ message }: { message: string }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <div className="flex items-center justify-center mb-4">
                    <AlertTriangle className="text-red-500 w-12 h-12" />
                </div>
                <h1 className="text-2xl font-bold text-center mb-4">Oops! Something went wrong</h1>
                <p className="text-gray-600 text-center mb-6">{message}</p>
                <div className="flex justify-center">
                    <Link
                        href="/"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                        Refresh
                    </Link>
                </div>
            </div>
        </div>
    )
}