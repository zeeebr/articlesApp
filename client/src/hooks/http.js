import { useCallback, useState, useContext } from "react"
import { AuthContext } from '../context/AuthContext'
import { useHistory } from 'react-router-dom'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const history = useHistory()
    
    const auth = useContext(AuthContext)

    const logoutHandler = () => {
        auth.logout()
        history.push('/')
    }

    const request = async (url, method = 'GET', body = null) => {
        setLoading(true)
        try {
            let headers = {}

            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            headers['Authorization'] = `Bearer ${auth.token}`
            
            let response = await fetch(url, { method, body, headers })
            let data = await response.json()

            /* if (!response.ok) {
                throw new Error(data.message || 'error')
            } */

            if (response.status === 401) {
                logoutHandler()
            }
            
            setLoading(false)

            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }

    const clearError = useCallback(() => setError(null), [])

    return { loading, request, error, clearError }
}