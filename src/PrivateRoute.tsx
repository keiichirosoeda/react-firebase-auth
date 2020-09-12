import React, { useContext } from 'react'
import { RouteProps } from 'react-router'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from './provider/AuthProvider'

interface PrivateRouteProps extends Omit<RouteProps, 'component'> {
  component: React.ElementType
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}: {
  component: React.ElementType
}) => {
  const { currentUser, loading } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          'loading...'
        ) : currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="login" />
        )
      }
    />
  )
}
