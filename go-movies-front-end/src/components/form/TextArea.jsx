/* eslint-disable react/prop-types */
export const TextArea = (props) => {
  return (
    <div className='mb-3'>
      <label className='form-label' htmlFor={props.name}>
        {props.title}
      </label>
      <textarea
        className='form-control'
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={props.onChange}
        rows={props.row}
      />
      <div className={props.errorDiv}>{props.errorMsg}</div>
    </div>
  )
}
