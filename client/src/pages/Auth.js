import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http'
import { useMessage } from '../hooks/message'
import { Card, Button, Container, Form, Badge, Row, Col } from 'react-bootstrap'

export const Auth = () => {
    const auth = useContext(AuthContext)
    const { loading, request, error, clearError } = useHttp()
    const message = useMessage()
    
    const [form, setForm] = useState({ email: '', pass: ''})

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
        <>
            <Container>
                <Row className="mt-5">
                    <Col></Col>
                    <Col>
                        <h2><Badge variant="secondary">ArticlesApp</Badge></h2>
                        <Card border="dark" style={{ width: '24rem' }}>
                            <Card.Header>Authorization</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control 
                                            type="email" 
                                            placeholder="Enter email" 
                                            name="email"
                                            onChange={changeHandler}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control 
                                            type="password" 
                                            placeholder="Password" 
                                            name="pass"
                                            onChange={changeHandler}
                                        />
                                    </Form.Group>
                                    <Button 
                                        type="submit"
                                        className="mr-2"
                                        onClick={loginHandler}
                                        disabled={loading}
                                    >
                                        Login
                                    </Button>
                                    {/* <Button 
                                        type="submit"
                                        onClick={registerHandler}
                                        disabled={loading}
                                    >
                                        Registration
                                    </Button> */}
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col></Col>
                </Row>    
            </Container>
        </>
    )
}