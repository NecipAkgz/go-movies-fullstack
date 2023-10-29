import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import Input from './form/input'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setJwtToken } = useOutletContext()
  const { setAlertClassname } = useOutletContext()
  const { setAlertMessage } = useOutletContext()

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(email)

    if (email === 'admin@example.com') {
      setJwtToken('asdasd')
      setAlertClassname('')
      setAlertMessage('')
      navigate('/')
    } else {
      setAlertClassname('alert-danger')
      setAlertMessage('Invalid credentials')
    }
  }
  return (
    <div className='col-md-6 offset-md-3'>
      <h2>Login</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        <Input
          className='form-control'
          title='Email Address'
          type='email'
          name='email'
          autoComplete='email-new'
          placeholder='Enter your email'
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          className='form-control'
          title='Password'
          type='password'
          name='password'
          autoComplete='password-new'
          placeholder='Password must be contain min 6 character'
          onChange={(event) => setPassword(event.target.value)}
        />
        <hr />
        <input className='btn btn-primary' type='submit' value='Login' />
      </form>
    </div>
  )
}
