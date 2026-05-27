import { Field } from '@base-ui/react/field';
import { Input } from '@base-ui/react/input';
import styles from './ReviewTextarea.module.scss';

interface TextareaProps {
  placeHolder: string;
  areaLabel: string;
}

const Textarea = ({ placeHolder, areaLabel }: TextareaProps) => {
  return (
    <Field.Root className="flex flex-col gap-2">
      <Field.Label className={styles['form__textarea--label']}>
        {areaLabel}
      </Field.Label>
      
      <Input
        render={<textarea rows={4} />} // rows do the magic input => textarea, must be here because TS
        className={styles['form__textarea']}
        placeholder={placeHolder}
      />

      <Field.Description className={styles['form__textarea--description']}>
        Håll det kort och koncist.
      </Field.Description>
    </Field.Root>
  );
}

export default Textarea;