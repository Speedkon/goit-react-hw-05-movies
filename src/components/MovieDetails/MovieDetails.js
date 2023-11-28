import { Container } from "./MovieDetails.styled";

export const MovieDetails = ({movie, error, isLoading}) => {
    const getAverage = () => {
        const { vote_average } = movie;
        return Math.round(vote_average * 10);
    };

    const ImgURL = () => {
        const { poster_path } = movie;
        const BASE_URL = "https://image.tmdb.org/t/p/w200";
        return BASE_URL+poster_path;
    }
    const defaultImg = 'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700'
    return (
    <>
        {error && <p>Oops, something went wrong.</p>}
            {isLoading && <p>Loading...</p>}


            {movie && (
                <Container>
                    <img src={movie.poster_path ? ImgURL() : defaultImg} width={250} alt={movie.title}></img>
                <div>
                    <h1>{movie.title}</h1>
                        <p>User score: {getAverage()}%</p>
                    <h2>Overview</h2>
                        <p>{ movie.overview}</p>
                    <h2>Genres</h2>
                    {movie.genres.map(({name}, index) => <span key={index}>{name} </span>)}
                </div>
                    </Container>
            )}
    </>
    )
}