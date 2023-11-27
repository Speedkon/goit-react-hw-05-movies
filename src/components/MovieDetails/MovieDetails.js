import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getMovieDetails } from "helpers/api";
import { Container } from "./MovieDetails.styled";

export const MovieDetails = () => {

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
    
    const getAverage = () => {
        const { vote_average } = movie;
        return Math.round(vote_average * 10);
    };

    const ImgURL = () => {
        const { poster_path } = movie;
        const BASE_URL = "https://image.tmdb.org/t/p/w200";
        return BASE_URL+poster_path;
    }

    return (
        <>
            {error && <p>Oops, something went wrong.</p>}
            {isLoading && <p>Loading...</p>}


            {movie && (
                <Container>
                <img src={ImgURL()} alt={movie.title}></img>
                <div>
                    <h1>{movie.title}</h1>
                        <p>User score: {getAverage()}%</p>
                    <h2>Overview</h2>
                        <p>{ movie.overview}</p>
                    <h2>Genres</h2>
                    {movie.genres.map(({name}, index) => <span key={index}>{name} </span>)}
                </div>
                    </Container>

            )}</>
    )
}