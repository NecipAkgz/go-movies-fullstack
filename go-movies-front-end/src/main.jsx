import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import EditMovie from './components/EditMovie.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import Genres from './components/Genres.jsx'
import GraphQL from './components/GraphQL.jsx'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import ManageCatalogue from './components/ManageCatalogue.jsx'
import Movie from './components/Movie.jsx'
import Movies from './components/Movies.jsx'
import { OneGenre } from './components/OneGenre.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/movies',
        element: <Movies />,
      },
      {
        path: '/movies/:id',
        element: <Movie />,
      },
      {
        path: '/genres',
        element: <Genres />,
      },
      {
        path: '/genres/:id',
        element: <OneGenre />,
      },
      {
        path: '/admin/movie/0',
        element: <EditMovie />,
      },
      {
        path: '/admin/movie/:id',
        element: <EditMovie />,
      },
      {
        path: '/manage-catalogue',
        element: <ManageCatalogue />,
      },
      {
        path: '/graphQL',
        element: <GraphQL />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
