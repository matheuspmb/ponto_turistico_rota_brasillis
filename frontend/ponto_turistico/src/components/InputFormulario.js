import styles from '../styles/InputFormulario.module.css';

function InputFormulario({ type, text, name, placeholder, onChange, value }) { 
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text} </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default InputFormulario;
