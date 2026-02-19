import React from 'react'
import {BrowserRoute} from "react-router"

const router = BrowserRoute ([
  {
    path: '/login',
    Element: <LoginForm/>
  },
  {
    path: '/register',
    Element: <RegisterForm/>
  }
])

export default router
