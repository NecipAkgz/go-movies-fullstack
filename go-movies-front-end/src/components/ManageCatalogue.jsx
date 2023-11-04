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
      .get(`http://localhost:8000/admin/movies`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => setMovies(response.data))
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
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
                <Link to={`/admin/movie/${m.id}`}>{m.title}</Link>
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
