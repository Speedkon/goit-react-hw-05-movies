import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviews } from "helpers/api";

export const Reviews = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState([]);

    const { movieId } = useParams();

    useEffect(() => {
        const fetchReviews = async () => {
            setIsLoading(true)
            try {
                const {results} = await getReviews(movieId)
                setReviews([...results])
            } catch (error) {
                setError(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchReviews()
    }, [movieId]);
    
    return (
        <>
            {error && <p>Oops, something went wrong.</p>}
            {isLoading && <p>Loading...</p>}

            {reviews.length > 0 && (
                <div>
                <ul>
                    {reviews.map(review => {
                        const { author, content } = review;
                        return (
                            <li key={author}>
                                <h1>{author}</h1>
                                <p>{content}</p>
                            </li>
                        )
                    }
                    )}
                    </ul>
                    </div>
            )}
            {reviews.length === 0 && !isLoading &&(<p>We don't have any reviews for this movie yet.</p>)}
        </>
    )
}