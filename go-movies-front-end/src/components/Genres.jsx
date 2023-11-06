import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Genres() {
  const [genres, setGenres] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND}/genres`)
      .then((res) => {
        if (res.data.error) {
          setError(res.data.error.message)
        } else {
          setGenres(res.data)
        }
      })
      .catch((err) => console.log(err))
  }, [])

  if (error !== null) {
    return <div>Error : {error}</div>
  } else {
    return (
      <div className='text-center'>
        <h2>Genres</h2>
        <hr />

        <div className='list-group'>
          {genres.map((g) => (
            <Link
              key={g.id}
              className='list-group-item list-group-item-action'
              to={`/genres/${g.id}`}
              state={{ genreName: g.genre }}>
              {g.genre}
            </Link>
          ))}
        </div>
      </div>
    )
  }
}
