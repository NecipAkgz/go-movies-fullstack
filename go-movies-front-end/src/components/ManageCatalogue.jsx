import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'

export default function ManageCatalogue() {
  const [movies, setMovies] = useState([])
  const { jwtToken } = useOutletContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!jwtToken) {
      navigate('/login')
      return
    }

    axios
      .get(`api/admin/movies`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => setMovies(response.data))
      .catch((error) => console.error(error))
  }, [jwtToken, navigate])

  return (
    <div>
      <h2>Movie Catalogue</h2>
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
                <Link to={`/admin/movies/${m.id}`}>{m.title}</Link>
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
