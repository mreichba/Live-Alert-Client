/**
 * PublicRoute.js
 * - Restricts access to unauthenticated users only
 * - If a token is present, redirects to the home page
 */

import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TokenServices from '../services/token-services'

export default function PublicRoute({ component, ...props }) {
  const Component = component
  return (
    <Route
      {...props}
      render={componentProps =>
        TokenServices.hasAuthToken()
          ? <Redirect to={'/users/home'} />
          : <Component {...props} {...componentProps} />
      }
    />
  )
}
