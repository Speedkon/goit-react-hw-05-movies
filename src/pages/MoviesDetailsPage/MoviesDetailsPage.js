import { MovieDetails } from "components/MovieDetails/MovieDetails";
import { Outlet, useLocation, Link } from "react-router-dom"
import { useRef } from "react";

export default function MovieDetailsPage() {

    const location = useLocation();
    const backLink = useRef(location);


    return (
        <>
            <Link to={backLink.current.state?.from ?? "/movies"}> Go back</Link>
            
            <MovieDetails />
            
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