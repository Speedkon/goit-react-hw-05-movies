import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchMovies } from "helpers/api";
import { MoviesList } from "components/MoviesList/MoviesList";

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

            <div>
                {error && <p>Oops, something went wrong.</p>}
                {isLoading && <p>Loading...</p>}
                {movies.length > 0 && !isLoading && <MoviesList movies={movies}/>}
                {movies.length === 0 && !isLoading && searchedMovie &&<p>Movie "{searchedMovie}" not found.</p>}
            </div>
        </>
)}