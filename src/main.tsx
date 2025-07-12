import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Edit from './Edit.tsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

// Create a router with a single route
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/todo/:id",
    element: <Edit></Edit>,

  }
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <RouterProvider router={router} />

  </StrictMode>,
)
