import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import '../App.css';

const StarRating = () => {

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    return (
        <div value={rating}>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return <label>
                    <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() => setRating(ratingValue)} />

                    <FaStar
                        className="star"
                        color={ratingValue <= (hover || rating) ? "#ff1493" : "#e4e5e9"}
                        size={50}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                    />
                </label>
            })}
            <h3>Your Rating is : {rating}</h3>
        </div>
    )
}

export default StarRating;
