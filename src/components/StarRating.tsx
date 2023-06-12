import React, { useState } from "react";

interface StarRatingProps {
  totalStars: number;
  initialRating: number;
  onChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  totalStars,
  initialRating,
  onChange,
}) => {
  const [rating, setRating] = useState(initialRating);

  const handleClick = (selectedRating: number) => {
    setRating(selectedRating);
    onChange(selectedRating);
  };

  return (
    <div>
      {Array.from({ length: totalStars }, (_, index) => index + 1).map(
        (star) => (
          <span
            key={star}
            className={`text-3xl ${
              star <= rating ? "text-yellow-500" : "text-gray-400"
            } cursor-pointer`}
            onClick={() => handleClick(star)}
          >
            &#9733;
          </span>
        ),
      )}
    </div>
  );
};

export default StarRating;
