import React, { FC } from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

type Props = {
  rating: number;
};

const Ratings: FC<Props> = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <BsStarFill
          key={i}
          size={20}
          color="#f6b100"
          className="mr-2 cursor-pointer"
        />
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <BsStarHalf
          key={i}
          size={20}
          color="#f6ba00"
          className="mr-2 cursor-pointer"
        />
      );
    } else {
      stars.push(
        <BsStar
          key={i}
          size={20}
          color="#f6ba00"
          className="mr-2 cursor-pointer"
        />
      );
    }
  }
  return <div className="flex mt-1 ml-2 800px:mt-0 800px:ml-0">{stars}</div>;
};

export default Ratings;
