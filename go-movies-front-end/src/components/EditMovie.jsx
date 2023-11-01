import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { Select } from '../components/form/Select'
import { TextArea } from './form/TextArea'
import Input from './form/input'

export default function EditMovie() {
  const navigate = useNavigate()
  const { jwtToken } = useOutletContext()

  const [error, setError] = useState(null)
  const [errors, setErrors] = useState([])

  const mpaaOptions = [
    { id: 'G', value: 'G' },
    { id: 'PG', value: 'PG' },
    { id: 'PG13', value: 'PG13' },
    { id: 'R', value: 'R' },
    { id: 'NC17', value: 'NC17' },
    { id: '18A', value: '18A' },
  ]

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

  const handleChange = (fieldName) => (event) => {
    let { name, value } = event.target
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

        <Input
          title={'Release Date'}
          className={'form-control'}
          type={'date'}
          name={'release_date'}
          value={movie.release_date}
          onChange={handleChange('release_date')}
          errorDiv={hasError('release_date') ? 'text-danger' : 'd-none'}
          errorMsg={'Pleae enter a release date'}
        />

        <Input
          title={'Runtime'}
          className={'form-control'}
          type={'text'}
          name={'runtime'}
          value={movie.runtime}
          onChange={handleChange('runtime')}
          errorDiv={hasError('runtime') ? 'text-danger' : 'd-none'}
          errorMsg={'Pleae enter a runtime'}
        />

        <Select
          title={'MPAA Rating'}
          name={'mpaa_rating'}
          options={mpaaOptions}
          onChange={handleChange('mpaa_rating')}
          placeHolder={'Select MPAA Rating'}
          errorMsg={'Please select a MPAA Rating'}
          errorDiv={hasError('mpaa_rating') ? 'text-danger' : 'd-none'}
        />

        <TextArea
          title={'Description'}
          name={'description'}
          value={movie.description}
          rows={'3'}
          onChange={handleChange('description')}
          errorDiv={hasError('description') ? 'text-danger' : 'd-none'}
          errorMsg={'Please enter a description'}
        />

        <hr />

        <h3>Genres</h3>
      </form>
    </div>
  )
}
