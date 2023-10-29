import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Movies() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    let moviesList = [
      {
        id: 1,
        title: 'The Matrix',
        relase_date: '1999-03-31',
        runtime: 136,
        mpaa_rating: 'R',
        description:
          'A computer programmer discovers that reality as he knows it is a simulation created by machines to subjugate humanity, and he joins a group of rebels to free the human race.',
      },
      {
        id: 2,
        title: 'The Shawshank Redemption',
        relase_date: '1994-09-23',
        runtime: 142,
        mpaa_rating: 'R',
        description:
          'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      },
      {
        id: 3,
        title: 'Pulp Fiction',
        relase_date: '1994-10-14',
        runtime: 154,
        mpaa_rating: 'R',
        description:
          'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
      },
    ]
    setMovies(moviesList)
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
