import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './pages'
import UpdateBook from './pages/books/edit'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/books/edit/:bookId', element: <UpdateBook /> },
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
