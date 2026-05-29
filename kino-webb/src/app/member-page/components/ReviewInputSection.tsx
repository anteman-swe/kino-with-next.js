"use client";
//
import { Button } from "@base-ui/react/button";
import { useState } from "react";
import { Form as ReviewForm } from "@base-ui/react/form";
import { Field } from '@base-ui/react/field';
import Textarea from "./ReviewTextarea";
import ReviewMovieList from "./ReviewMovieList";
import { StarRating } from "./StarRating";
import styles from "./ReviewInputSection.module.scss";
import { z } from 'zod';

interface ReviewInputSectionProps {
  reviewerID: string;
}

type FormValues = {
  movieId: string;
  rating: number;
  reviewText: string;
  userId: string;
}

const schema = z.object({
  movieId: z.string().min(1, "Välj en film"),
  rating: z.number().min(1, "Betyg krävs").max(5, "Max 5 stjärnor"),
  reviewText: z.string().min(3, "Recensionen måste vara minst 3 tecken"),
  reviewerID: z.string().min(1, "Användare måste finnas"),  
});

async function submitForm(formValues: FormValues) {
  const result = schema.safeParse(formValues);

  if (!result.success) {
    return {
      errors: z.flattenError(result.error).fieldErrors,
    };
  }

  return {
    errors: {},
  };
}


export default function ReviewInputSection({ reviewerID }: ReviewInputSectionProps) {
  const randomRating = () => Math.ceil(Math.random() * 5)
  const [rating, setRating] = useState<number>(randomRating);
  const [formKey, setFormKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  return (
    <div className={styles.reviewFormWrapper}>
      <h3 className={styles.reviewHeader}>Recensera en film du har sett!</h3>
      <div className={styles.reviewForm}>
        <ReviewForm
        key={formKey}
        errors={errors}
          onFormSubmit={async (formValues: FormValues) => {
            const convFormValues: FormValues = {
              ...formValues,
              rating: Number(formValues.rating),
            }
            setLoading(true);
            const response = await submitForm(convFormValues);
            setErrors(response.errors);
            if (Object.keys(response.errors).length === 0) {
              setRating(randomRating());
              setFormKey(k => k + 1);
            }
            setLoading(false);
            
          }}
        >
          <ReviewMovieList name="movieId" />
          <p className={styles.RateMovie}>Hur många stjärnor var den värd?</p>
          <StarRating
            value={rating}
            onChange={setRating}
            maxStars={5}
            size={48}
            color="#FFD700"
            emptyColor="#C0C0C0"
          />
          <p className={styles.ratingText}>Filmrating: {rating}</p>
          <Field.Root name="rating">
            <Field.Control
            type="hidden"
            value={rating}
            onChange={() => {}}
            />
          </Field.Root>
          <Textarea
            name="reviewText"
            placeHolder="Skriv vad du tyckte om filmen..."
            areaLabel="Beskrivning"
            description="Skriv vad du tycker..."
          />
          <Field.Root name="reviewerID">
            <Field.Control
              type="hidden"
              value={reviewerID}
              onChange={() => {}}
            />
          </Field.Root>
          <Button
            type="submit"
            disabled={loading}
            focusableWhenDisabled
            className={styles.submitButton}
          >
            Skicka in
          </Button>
        </ReviewForm>
      </div>
    </div>
  );
}
