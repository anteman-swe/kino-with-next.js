// 
import { Button } from '@base-ui/react/button';

import { Form as ReviewForm } from '@base-ui/react/form'
import Textarea from "./ReviewTextarea";


export default function ReviewInputModule() {
    return (
        <ReviewForm
        onSubmit={async (event) => {
            event.preventDefault();
        }}
        >
        <Textarea
        placeHolder="Vad tyckte du om filmen?"
        areaLabel="Beskrivning"
        />
        </ReviewForm>
    );
}