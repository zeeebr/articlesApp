import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http'
import { useMessage } from '../hooks/message'

export const Auth = () => {
    const auth = useContext(AuthContext)
    const { loading, request, error, clearError } = useHttp()
    const message = useMessage()
    
    const [form, setForm] = useState({ name: '', pass: ''})

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    return(
        <div className="row">
            <div className="col s6 offset-s3">
                <h3>ArticlesApp</h3>
                <div className="card teal darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input 
                                    placeholder="Enter user name" 
                                    id="name" 
                                    type="text" 
                                    name="name"
                                    onChange={changeHandler}
                                />   
                            </div>
                            <div className="input-field">
                                <input 
                                    placeholder="Enter password" 
                                    id="pass" 
                                    type="text" 
                                    name="pass"
                                    onChange={changeHandler}
                                /> 
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button 
                            className="btn yellow darken-4"
                            onClick={loginHandler}
                            disabled={loading}
                        >
                            Login
                        </button>&nbsp;&nbsp;&nbsp;
                        <button 
                            className="btn yellow darken-4" 
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Registration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}