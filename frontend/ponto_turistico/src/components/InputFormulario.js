import styles from '../styles/InputFormulario.module.css';

function InputFormulario({ type, text, name, placeholder, onChange, value, isDescricao }) { 
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}</label>
      {isDescricao ? (
        <textarea
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          className={styles.textareaDescricao}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      )}
    </div>
  );
}

export default InputFormulario;
