import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Movie() {
  const [movie, setMovie] = useState({})
  let { id } = useParams()

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND}/movies/${id}`)
      .then((response) => {
        setMovie(response.data)
      })
      .catch((error) => console.error(error))
  }, [id])

  if (movie.genres) {
    movie.genres = Object.values(movie.genres)
  } else {
    movie.genres = []
  }

  return (
    <div>
      <h2>Movie {movie.title}</h2>
      <small>
        <em>
          {movie.release_date}, {movie.runtime} minutes, Rated
          {movie.mpaa_rating}
        </em>
      </small>
      <br />
      {movie.genres.map((g) => (
        <span key={g.genre} className='badge bg-secondary me-2'>
          {g.genre}
        </span>
      ))}
      <hr />

      {movie.image !== '' && (
        <div className='mb-3'>
          <img
            src={`https://image.tmdb.org/t/p/w200/${movie.image}`}
            alt='poster'
          />
        </div>
      )}

      <p>{movie.description}</p>
    </div>
  )
}
