import { Link, useLocation } from 'react-router-dom';

export const MoviesList = ({movies}) => {
    const location = useLocation();
    
    return (
        <ul>
                {movies.length > 0 && (
                    movies.map(
                        (movie, index) => {
                            const { id, original_title, poster_path} = movie;
                            const BASE_URL = "https://image.tmdb.org/t/p/w200";
                            const photo = BASE_URL + poster_path;
                            const defaultImg = 'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700'

                            return (
                                <li key={index}>
                                    <Link to={`movies/${id}`} state={{from: location}}>
                                    {poster_path && (<img src={poster_path ? photo : defaultImg} width={250} alt={original_title} />)}
                                    <h1>{original_title}</h1>
                                    </Link>
                                </li>)
                        }
                    )
                )}
            </ul>
    )
}