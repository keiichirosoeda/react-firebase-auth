import React, { useContext } from 'react'
import { AuthContext } from '../../provider/AuthProvider'

export const Home = () => {
  const { logout } = useContext(AuthContext)

  const handleLogout = () => logout()

  return (
    <>
      <h1>Home</h1>
      <button type="button" onClick={handleLogout}>
        ログアウト
      </button>
    </>
  )
}
