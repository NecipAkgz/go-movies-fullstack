import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Select } from '../components/form/Select'
import { Checkbox } from './form/Checkbox'
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
    description: '',
    genres: [],
    genres_array: [Array(13).fill(false)],
  })

  // get id from the URL
  let { id } = useParams()
  if (id === undefined) {
    id = 0
  }

  useEffect(() => {
    if (jwtToken === '') {
      navigate('/login')
      return
    }

    if (id === 0) {
      // adding a movie
      setMovie({
        id: 0,
        title: '',
        release_date: '',
        runtime: '',
        mpaa_rating: '',
        description: '',
        genres: [],
        genres_array: [Array(13).fill(false)],
      })
      axios
        .get(`${import.meta.env.VITE_REACT_APP_BACKEND}/genres`)
        .then((response) => {
          const checks = []
          response.data.forEach((g) => {
            checks.push({ id: g.id, checked: false, genre: g.genre })
          })

          setMovie((m) => ({
            ...m,
            genres: checks,
            genres_array: [],
          }))
        })
        .catch((err) => console.log(err))
    } else {
      // editing an existing movie
      axios
        .get(`${import.meta.env.VITE_REACT_APP_BACKEND}/admin/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then(({ data, status }) => {
          if (status !== 200) {
            setError('invalid response code: ' + status)
            return status
          }
          data.movie.release_date = new Date(data.movie.release_date)
            .toISOString()
            .split('T')[0]
          const checks = []
          // Iterate over each genre in the movie's genres
          data.genres.forEach((g) => {
            // Check if the genre's id is present in the genres_array
            if (data.movie.genres_array.indexOf(g.id) !== -1) {
              // If the genre's id is found, push an object with id, checked as true, and genre into the checks array
              checks.push({ id: g.id, checked: true, genre: g.genre })
            } else {
              // If the genre's id is not found, push an object with id, checked as false, and genre into the checks array
              checks.push({ id: g.id, checked: false, genre: g.genre })
            }
          })

          setMovie({
            ...data.movie,
            genres: checks,
          })
        })
        .catch((err) => console.log(err))
    }
  }, [id, jwtToken, navigate])

  const handleSubmit = (event) => {
    event.preventDefault()

    let errors = []
    let required = [
      { field: movie.title, name: 'title' },
      { field: movie.release_date, name: 'release_date' },
      { field: movie.runtime, name: 'runtime' },
      { field: movie.description, name: 'description' },
      { field: movie.mpaa_rating, name: 'mpaa_rating' },
    ]

    required.forEach((obj) => {
      if (obj.field === '') {
        errors.push(obj.name)
      }
    })

    if (movie.genres_array.length === 0) {
      Swal.fire({
        title: 'Error',
        text: 'Please select at least one genre',
        icon: 'error',
        confirmButtonText: 'Ok',
      })
      errors.push('genres_array')
    }

    setErrors(errors)

    if (errors.length > 0) {
      return false
    }

    const requestBody = {
      ...movie,
      release_date: new Date(movie.release_date),
      runtime: parseInt(movie.runtime, 10),
    }

    axios({
      method: movie.id > 0 ? 'patch' : 'put',
      url: `${import.meta.env.VITE_REACT_APP_BACKEND}/admin/movies/${movie.id}`,
      data: JSON.stringify(requestBody),
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error)
        } else {
          navigate('/manage-catalogue')
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
  }

  const handleChange = (fieldName) => (event) => {
    let { name, value } = event.target
    setMovie({ ...movie, [name]: value })
  }

  const handleCheck = (event, position) => {
    let tempArr = movie.genres
    tempArr[position].checked = !tempArr[position].checked

    let tempIDs = movie.genres_array
    if (!event.target.checked) {
      tempIDs.splice(tempIDs.indexOf(event.target.value))
    } else {
      tempIDs.push(parseInt(event.target.value, 10))
    }

    setMovie({ ...movie, genres_array: tempIDs })
  }

  const confirmDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          method: 'delete',
          url: `${import.meta.env.VITE_REACT_APP_BACKEND}/admin/movies/${
            movie.id
          }`,
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
          .then((response) => {
            if (response.data.error) {
              console.log(response.data.error)
            } else {
              navigate('/manage-catalogue')
            }
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response.data)
              console.log(error.response.status)
            }
          })
      }
    })
  }

  if (error !== null) {
    return <div>Error : {error.message}</div>
  } else {
    return (
      <div>
        <h2>EditMovie</h2>
        <hr />
        {/* <pre>{JSON.stringify(movie, null, 3)}</pre> */}

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
            value={movie.mpaa_rating}
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

          {movie.genres && movie.genres.length > 1 && (
            <>
              {movie.genres.map((g, index) => (
                <Checkbox
                  key={index}
                  id={'genre-' + index}
                  title={g.genre}
                  name={'genre'}
                  onChange={(event) => handleCheck(event, index)}
                  value={g.id}
                  checked={movie.genres[index].checked}
                />
              ))}
            </>
          )}

          <hr />

          <button className='btn btn-primary'>Save</button>

          {movie.id > 0 && (
            <a
              href='#!'
              className='btn btn-danger ms-2'
              onClick={confirmDelete}>
              Delete Movie
            </a>
          )}
        </form>
      </div>
    )
  }
}
