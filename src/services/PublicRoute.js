import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TokenServices from '../services/token-services'
//if auth token present then redirects to user home page, else only shows public route components
export default function PublicRoute({ component, ...props }) {
  const Component = component
  return (
    <Route
      {...props}
      render={componentProps => (
        TokenServices.hasAuthToken()
          ? <Redirect to={'/users/home'} />
          : <Component {...props} {...componentProps} />
      )}
    />
  )
}
