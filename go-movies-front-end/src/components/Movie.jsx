import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Movie() {
  const [movie, setMovie] = useState({})
  let { id } = useParams()

  useEffect(() => {
    let myMovie = {
      id: 1,
      title: 'The Matrix',
      relase_date: '1999-03-31',
      runtime: 136,
      mpaa_rating: 'R',
      description:
        'A computer programmer discovers that reality as he knows it is a simulation created by machines to subjugate humanity, and he joins a group of rebels to free the human race.',
    }

    setMovie(myMovie)
  }, [id])

  return (
    <div>
      <h2>Movie {movie.title}</h2>
      <small>
        <em>
          {movie.relase_date}, {movie.runtime}, {movie.mpaa_rating}
        </em>
      </small>
      <hr />
      <p>{movie.description}</p>
    </div>
  )
}
