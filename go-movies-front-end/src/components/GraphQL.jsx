import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Input from '../components/form/Input'

export default function GraphQL() {
  // set up stateful variables
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [fullList, setFullList] = useState([])

  // perform a search
  const performSearch = () => {
    const payload = `
      {
        search(titleContains: "${searchTerm}") {
          id
          title
          runtime
          release_date
          mpaa_rating
        }
      }
    `
    axios
      .post(`api/graph`, payload)
      .then((response) => {
        let theList = response.data.data.search
        setMovies(theList)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleChange = (event) => {
    event.preventDefault()

    let value = event.target.value
    setSearchTerm(value)

    if (value.length > 2) {
      performSearch()
    } else {
      setMovies(fullList)
    }
  }

  useEffect(() => {
    const payload = `
      {
          list {
            id
            title
            runtime
            release_date
            mpaa_rating
          }
      }
    `

    axios
      .post(`api/graph`, payload)
      .then((response) => {
        let theList = response.data.data.list
        setMovies(theList)
        setFullList(theList)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div className='text-center'>
      <h2>GraphQL</h2>
      <hr />

      <form onSubmit={handleChange}>
        <Input
          title={'Search'}
          className={'form-control'}
          type={'text'}
          name={'search'}
          value={searchTerm}
          placeholder={'Search Movie...'}
          onChange={handleChange}
        />
      </form>

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
                <td>{new Date(m.release_date).toLocaleDateString()}</td>
                <td>{m.mpaa_rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No movies yet...</p>
      )}
    </div>
  )
}
