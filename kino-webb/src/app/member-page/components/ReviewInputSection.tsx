"use client";
//
import { Button } from "@base-ui/react/button";
import { useState } from "react";
import { Form as ReviewForm } from "@base-ui/react/form";
import Textarea from "./ReviewTextarea";
import ReviewMovieList from "./ReviewMovieList";
import { StarRating } from "./StarRating";
import styles from './ReviewInputSection.module.scss';

export default function ReviewInputSection() {
  const [rating, setRating] = useState(0);
  return (
    <>
      <ReviewForm
        onSubmit={async (event) => {
          event.preventDefault();
          console.log('Formulär inskickad!');
        }}
      >
        <ReviewMovieList />
        <StarRating
          value={rating}
          onChange={setRating}
          maxStars={5}
          size={48}
          color="#FFD700"
          emptyColor="#C0C0C0"
        />
        <p>Current rating: {rating}</p>
        <Textarea
          placeHolder="Vad tyckte du om filmen?"
          areaLabel="Beskrivning"
          description="Skriv vad du tycker..."
        />
        <Button type="submit" className={styles.submitButton}/>
      </ReviewForm>
    </>
  );
}
