import styles from '@/s/components/Input.module.scss';


export interface InputProps {
  label: string,
  name: string,
  type: 'text' | 'password' | 'email',
  value: string,
  inputProps?: object
}

export default function Input({label, name, type, value, inputProps}: InputProps) {
  return (
      <div className={styles.formControl}>
        <label>
          <div>{label}</div>
          <input {...inputProps} type={type} name={name} value={value}/>
        </label>
      </div>
  );
}
