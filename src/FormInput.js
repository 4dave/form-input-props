const FormInput = (props) => {
  const { label, defaultValue, onChange, ...inputProps } = props

  return (
    <div>
      <label>{label}</label>
      <input {...inputProps} onChange={onChange} defaultValue={defaultValue} />
    </div>
  )
}

export default FormInput
