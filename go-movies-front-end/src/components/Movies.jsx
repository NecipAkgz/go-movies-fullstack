import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Movies() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    axios
      .get(`api/movies`)
      .then((response) => setMovies(response.data))
      .catch((error) => console.error(error))
  }, [])

  return (
    <div>
      <h2>Movies</h2>
      <hr />
      <table className='table table-striped table-hover'>
        <thead className='table-dark'>
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
    </div>
  )
}
