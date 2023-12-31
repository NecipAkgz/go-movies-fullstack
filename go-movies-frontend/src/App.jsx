import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Alert from './components/Alert'

export default function App() {
  const [jwtToken, setJwtToken] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [alertClassname, setAlertClassname] = useState('')

  const [tickInterval, setTickInterval] = useState()

  const navigate = useNavigate()

  const logOut = () => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND}/logout`, {
        withCredentials: true,
      })
      .catch((error) => console.log('error logging out', error))
      .finally(() => {
        setJwtToken('')
        toggleRefresh(false)
        navigate('/login')
      })
  }

  const toggleRefresh = useCallback(
    (status) => {
      if (status) {
        let i = setInterval(() => {
          axios
            .get(`${import.meta.env.VITE_REACT_APP_BACKEND}/refresh`, {
              withCredentials: true,
            })
            .then((response) => {
              if (response.data.access_token) {
                setJwtToken(response.data.access_token)
              }
            })
            .catch((error) => {
              console.log('user is not logged in')
            })
        }, 600000)
        setTickInterval(i)
      } else {
        setTickInterval(null)
        clearInterval(tickInterval)
      }
    },
    [tickInterval]
  )

  useEffect(() => {
    console.log(import.meta.env.VITE_REACT_APP_BACKEND)

    if (jwtToken === '') {
      axios
        .get(`${import.meta.env.VITE_REACT_APP_BACKEND}/refresh`, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data.access_token) {
            setJwtToken(response.data.access_token)
            toggleRefresh(true)
          }
        })
        .catch((error) => {
          console.log('user is not logged in')
        })
    }
  }, [jwtToken, toggleRefresh])

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h1 className='mt-3'>Go Watch a Movie</h1>
        </div>
        <div className='col text-end'>
          {jwtToken === '' ? (
            <Link to='/login'>
              <span className='badge bg-success'>Login</span>
            </Link>
          ) : (
            <a href='#'>
              <span className='badge bg-danger' onClick={logOut}>
                Logout
              </span>
            </a>
          )}
        </div>
        <hr className='mb-3' />
      </div>

      <div className='row'>
        <div className='col-md-2'>
          <nav>
            <div className='list-group'>
              <Link to='/' className='list-group-item list-group-item-action'>
                Home
              </Link>
              <Link
                to='/movies'
                className='list-group-item list-group-item-action'>
                Movies
              </Link>
              <Link
                to='/genres'
                className='list-group-item list-group-item-action'>
                Genres
              </Link>
              {jwtToken !== '' && (
                <>
                  <Link
                    to='/admin/movie/0'
                    className='list-group-item list-group-item-action'>
                    Add Movie
                  </Link>
                  <Link
                    to='/manage-catalogue'
                    className='list-group-item list-group-item-action'>
                    Manage Catalogue
                  </Link>
                  <Link
                    to='/graphql'
                    className='list-group-item list-group-item-action'>
                    GraphQL
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
        <div className='col-md-10'>
          <Alert className={alertClassname} message={alertMessage} />
          <Outlet
            context={{
              jwtToken,
              setJwtToken,
              setAlertClassname,
              setAlertMessage,
              toggleRefresh,
            }}
          />
        </div>
      </div>
    </div>
  )
}
