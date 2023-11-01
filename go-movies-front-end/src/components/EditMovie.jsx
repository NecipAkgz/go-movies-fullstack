import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import Input from './form/input'

export default function EditMovie() {
  const navigate = useNavigate()
  const { jwtToken } = useOutletContext()

  const [error, setError] = useState(null)
  const [errors, setErrors] = useState([])

  const hasError = (key) => {
    return errors.indexOf(key) !== -1
  }

  const [movie, setMovie] = useState({
    id: 0,
    title: '',
    relase_date: '',
    runtime: '',
    mpaa_rating: '',
    descripton: '',
  })

  // get id from the URL
  let { id } = useParams()

  useEffect(() => {
    if (jwtToken === '') {
      navigate('/login')
      return
    }
  }, [jwtToken, navigate])

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const handleChange = () => (event) => {
    let value = event.target.value
    let name = event.target.name
    setMovie({ ...movie, [name]: value })
  }

  return (
    <div>
      <h2>EditMovie</h2>
      <hr />
      <pre>{JSON.stringify(movie, null, 3)}</pre>

      <form onSubmit={handleSubmit}>
        <input type='hidden' name='id' value={movie.id} />

        <Input
          title={'Title'}
          className={'form-control'}
          type={'text'}
          name={'title'}
          value={movie.title}
          onChange={handleChange('title')}
          errorDiv={hasError('title') ? 'text-danger' : 'd-none'}
          errorMsg={'Pleae enter a title'}
        />
      </form>
    </div>
  )
}
