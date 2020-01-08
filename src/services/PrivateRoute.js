import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TokenServices from '../services/token-services'

export default function PrivateRoute({ component, ...props }) {
  const Component = component
  return (
    <Route
      {...props}
      render={componentProps => (
        TokenServices.hasAuthToken()
          ? <Component {...props} {...componentProps} />
          : <Redirect
            to={{
              pathname: '/auth/login',
              state: { from: componentProps.location }
            }}
          />
      )}
    />
  )
}
