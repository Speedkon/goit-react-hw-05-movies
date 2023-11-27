import { useEffect, useState } from "react";
import { useLocation, useSearchParams, Link } from "react-router-dom";
import { fetchMovies } from "helpers/api";


export default function MoviesPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [movies, setMovies] = useState([]);

    const [params, setParams] = useSearchParams()
    const searchedMovie = params.get("movie") ?? "";

    useEffect(() => {
        const getMovie = async () => {
        setIsLoading(true)
        try {
            if (!searchedMovie) {
                return
            }
            const {results} = await fetchMovies(searchedMovie)
            if (!results) {
                return
            }
            setMovies(results)

        } catch (error) {
            setError(error)
            
        } finally {
            setIsLoading(false)
        }};

        getMovie()

    }, [searchedMovie])
    
    const location = useLocation();

    
    const onSearch = (e) => {
        e.preventDefault()
        
        const { value } = e.target.elements.movie; 
        if (value) {
        setParams({movie: value})
        }
    } 
    
    return (
        <>
            <form onSubmit={onSearch}>
                <input
                    type="text" autoComplete="off" placeholder="Search movie"
                    name="movie">
                </input>
                <button>Search</button>
            </form>

            {error && <p>Oops, something went wrong.</p>}
            {isLoading && <p>Loading...</p>}
            {movies.length > 0 && !isLoading && (
            <ul>
                {movies.length > 0 && (
                    movies.map(
                        (movie, index) => {
                            const { id, original_title, poster_path
                            } = movie;
                            const BASE_URL = "https://image.tmdb.org/t/p/w200";
                        const photo = BASE_URL + poster_path;

                            return (
                                
                                <li key={index}>
                                    <Link to={`${id}`} state={{from: location}}>
                                    {poster_path && (<img src={photo} alt={original_title} />)}
                                    <h1>{original_title}</h1>
                                        </Link>
                                </li>
                            )
                        }
                    )
                )}
                    </ul>
            )}

            {movies.length === 0 && !isLoading && searchedMovie &&<p>Movie "{searchedMovie}" not found.</p>}
            </>
    )}