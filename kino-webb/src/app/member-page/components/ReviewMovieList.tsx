import { useId } from "react";

import { movies } from "@/Data/movies"; // Dummy data, remove when changing to real data from db
import { Movie } from "@/generated/prisma/client";
import { Combobox } from "@base-ui/react/combobox";
import { Field } from "@base-ui/react/field";
import styles from "./ReviewMovieList.module.scss";
const movieList = movies;

interface ReviewMovieListProps {
  name: string;
}

export default function ReviewMovieList({
  name = "movieId",
}: ReviewMovieListProps) {
  const id = useId();
  

  return (
    <Field.Root name={name}>
      <Field.Label className={styles.Label} htmlFor={id}>
        Välj en film att recensera:
      </Field.Label>
      <Combobox.Root
        items={movieList}
        itemToStringLabel={(item: Movie) => item.Series_Title}
        itemToStringValue={(item: Movie) => item.id.toString()}
      >
        <Combobox.InputGroup className={styles.InputGroup}>
          <Combobox.Input
            id={id}
            className={styles.Input}
            placeholder="t  ex Star Wars - Return of the Jedi"
            
          />
          <div className={styles.ActionButtons}>
            <Combobox.Clear
              className={styles.Clear}
              aria-label="Clear selection"
            >
              <XIcon />
            </Combobox.Clear>
            <Combobox.Trigger
              className={styles.Trigger}
              aria-label="Open popup"
            >
              <CaretDownIcon />
            </Combobox.Trigger>
          </div>
        </Combobox.InputGroup>
        <Combobox.Portal>
          <Combobox.Positioner className={styles.Positioner} sideOffset={4}>
            <Combobox.Popup className={styles.Popup}>
              <Combobox.Empty>
                <div className={styles.Empty}>
                  Inga filmer har hämtats från databasen
                </div>
              </Combobox.Empty>
              <Combobox.List className={styles.List}>
                {(item: Movie) => (
                  <Combobox.Item
                    key={item.id}
                    value={item}
                    className={styles.Item}
                  >
                    <Combobox.ItemIndicator className={styles.ItemIndicator}>
                      <CheckIcon />
                    </Combobox.ItemIndicator>
                    <span className={styles.ItemText}>{item.Series_Title}</span>
                  </Combobox.Item>
                )}
              </Combobox.List>
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>
    </Field.Root>
  );
}

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      {...props}
      style={{ display: "block", ...props.style }}
    >
      <path d="m2.5 8.5 4 4 7-9" />
    </svg>
  );
}

function XIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="square"
      strokeLinejoin="round"
      {...props}
      style={{ display: "block", ...props.style }}
    >
      <path d="m4.5 4.5 7 7m-7 0 7-7" />
    </svg>
  );
}

function CaretDownIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      {...props}
      style={{ display: "block", ...props.style }}
    >
      <path d="M12 6H4l4 4.5z" />
    </svg>
  );
}
