import React, { useEffect, useState, ReactNode } from 'react'
import firebase from 'firebase'
import * as H from 'history'
import { auth } from '../lib/firebase'

export interface Context {
  login: (email: string, password: string, history: H.History) => Promise<void>
  signup: (email: string, password: string, history: H.History) => Promise<void>
  logout: () => Promise<void>
  currentUser: firebase.User | null
  loading: boolean
}

export const AuthContext = React.createContext({} as Context)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const login = async (
    email: string,
    password: string,
    history: H.History
  ): Promise<void> => {
    try {
      await auth.signInWithEmailAndPassword(email, password)
      history.push('/')
    } catch (error) {
      alert(error)
    }
  }

  const signup = async (
    email: string,
    password: string,
    history: H.History
  ): Promise<void> => {
    try {
      await auth.createUserWithEmailAndPassword(email, password)
      history.push('/')
    } catch (error) {
      alert(error)
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await auth.signOut()
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        login,
        signup,
        logout,
        currentUser,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
