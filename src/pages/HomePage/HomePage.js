import { useEffect, useState } from "react"
import { getTrendingMovies } from "helpers/api";
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';

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

    const location = useLocation();

    return (
        <div>
            <h1>Trending today</h1>

            {error && <p>Oops, something went wrong.</p>}
            {isLoading && <p>Loading...</p>}

            <ul>
                {movies.length > 0 && (
                    movies.map(
                        (movie, index) => {
                            const { id, original_title, poster_path} = movie;
                            const BASE_URL = "https://image.tmdb.org/t/p/w200";
                        const photo = BASE_URL + poster_path;

                            return (
                                <li key={index}>
                                    <Link to={`movies/${id}`} state={{from: location}}>
                                    {poster_path && (<img src={photo} alt={original_title} />)}
                                    <h1>{original_title}</h1>
                                    </Link>
                                </li>)
                        }
                    )
                )}
            </ul>
        </div>
    )
}