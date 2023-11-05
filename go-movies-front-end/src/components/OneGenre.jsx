import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

export const OneGenre = () => {
  const location = useLocation()
  const { genreName } = location.state

  const [movies, setMovies] = useState([])

  let { id } = useParams()

  useEffect(() => {
    axios
      .get(`http://localhost:8000/movies/genres/${id}`)
      .then((res) => {
        setMovies(res.data)
      })
      .catch((err) => console.log(err))
  }, [id])

  return (
    <>
      <h2>Genre : {genreName}</h2>
      <hr />

      {movies ? (
        <table className='table table-stripped table-hover'>
          <thead>
            <tr>
              <th>Movie</th>
              <th>Release Date</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((m) => (
              <tr key={m.id}>
                <td>
                  <Link to={`/movies/${m.id}`}>{m.title}</Link>
                </td>
                <td>{m.relase_date}</td>
                <td>{m.mpaa_rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No movies in this genre</p>
      )}
    </>
  )
}
