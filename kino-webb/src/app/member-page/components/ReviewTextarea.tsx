import { Field } from '@base-ui/react/field';
import { Input } from '@base-ui/react/input';
import styles from './ReviewTextarea.module.scss';

interface TextareaProps {
  name: string;
  placeHolder: string;
  areaLabel: string;
  description: string;
}

const Textarea = ({ name, placeHolder, areaLabel, description }: TextareaProps) => {
  return (
    <Field.Root className={styles.FieldRoot} name={name}>
      <Field.Label className={styles['form__textarea--label']}>
        {areaLabel}
      </Field.Label>
      
      <Input
        render={<textarea rows={4} />} // rows do the magic, input => textarea, must be here because TS
        className={styles['form__textarea']}
        placeholder={placeHolder}
      />

      <Field.Description className={styles['form__textarea--description']}>
        {description}
      </Field.Description>
    </Field.Root>
  );
}

export default Textarea;