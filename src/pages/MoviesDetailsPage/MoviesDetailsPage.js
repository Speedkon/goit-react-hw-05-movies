import { Outlet, useLocation, Link, useParams } from "react-router-dom"
import { useEffect, useState, useRef } from "react";
import { getMovieDetails } from "helpers/api"; 
import { MovieDetails } from "components/MovieDetails/MovieDetails";

export default function MovieDetailsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [movie, setMovie] = useState(null);

    const { movieId } = useParams();

    useEffect(() => {
        const getDetails = async () => {
            setIsLoading(true)
            try {
                const response = await getMovieDetails(movieId)
                setMovie({ ...response })
            } catch (error) {
                setError(error)
            } finally {
                setIsLoading(false)
            }
        }
        getDetails()
    }, [movieId]);

    const location = useLocation();
    const backLink = useRef(location);
    return (
        <>
            <Link to={backLink.current.state?.from ?? "/movies"}> Go back</Link>
            <MovieDetails movie={movie} error={error} isLoading={isLoading} />
            <div>
            <p>Additional information:</p>

            <ul>
                <li>
                    <Link to="cast">Cast</Link>
                </li>
                <li>
                    <Link to="reviews">Reviews</Link>
                </li>
            </ul>
            </div>

            <Outlet />
    </>
)}