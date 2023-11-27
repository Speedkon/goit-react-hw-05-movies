import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCast } from "helpers/api";


export const Cast = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cast, setCast] = useState([]);

    const { movieId } = useParams();

    useEffect(() => {
        const fetchCast = async () => {
            setIsLoading(true)
            try {
                const { cast } = await getCast(movieId)
                setCast([ ...cast ])
            } catch (error) {
                setError(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchCast()
    }, [movieId]);


    return (
        <>
            {error && <p>Oops, something went wrong.</p>}
            {isLoading && <p>Loading...</p>}

            {cast.length > 0 && (
                <div>
                <ul>
                    {cast.map(actor => {
                        const { profile_path, name, character } = actor;
                        const BASE_URL = "https://image.tmdb.org/t/p/w200";
                        const photo = BASE_URL + profile_path;
                        return (
                            <li key={name}>
                                {profile_path && (<img src={photo} alt={name} />)}
                                <div>
                                <p>{name}</p>
                                    <h1>Character: {character}</h1>
                                </div>
                            </li>)
                    })}
                    </ul>
                    </div>
            )}
        </>
    )
}