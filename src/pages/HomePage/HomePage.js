import { useEffect, useState } from "react"
import { getTrendingMovies } from "helpers/api";
import { MoviesList } from "components/MoviesList/MoviesList";

export default function HomePage() {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getTrending = async () => {
            setIsLoading(true)
            try {
                const { results } = await getTrendingMovies()
                setMovies(prev => [...prev, ...results])
            } catch (error) {
                setError(error)
            } finally {
                setIsLoading(false)
            }
        }
        getTrending()
    }, [])

    return (
        <div>
            <h1>Trending today</h1>

            {error && <p>Oops, something went wrong.</p>}
            {isLoading && <p>Loading...</p>}

            <MoviesList movies={movies}/>
        </div>
    )
}