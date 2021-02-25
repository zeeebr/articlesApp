import React, { useState } from 'react'
import { Card, Container, Row, Col, Button, Form } from 'react-bootstrap'
import { useHttp } from '../hooks/http'
import { useMessage } from '../hooks/message'


export const Articles = () => {
    const [ eid, setEid ] = useState(null)
    const [ paper, setPaper ] = useState(null)

    const message = useMessage()
    const { loading, request, error, clearError } = useHttp()
    
    const findArticle = async () => {
        let resp = await request('/paper/find_one', 'POST', { eid: eid })

        if(resp) {
            setPaper(resp)
            console.log(resp)
        } 
    }

    const updatePaper = async () => {
        let resp = await request('/paper/update', 'POST', paper)
        message(resp.message)
    }

    const deletePaper = async () => {
        let resp = await request('/paper/delete', 'DELETE', paper)
        setPaper(null)
        message(resp.message)
    }

    const changeHandlerId = event => {
        setEid(event.target.value)
    }

    const changeHandlerPaper = event => {
        if (event.target.name === 'ourAuthorsId') {
            let arr = event.target.value.split(',').map(Number)
            setPaper({ ...paper, [event.target.name]: arr })
        } else {
            setPaper({ ...paper, [event.target.name]: event.target.value })
        }
    }

    return(
        <Container fluid>
            <Row>
                <Col sm={3}>
                <Card border="dark">
                    <Card.Header>Correction of exist article:</Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Label>Eid:</Form.Label>
                                <Form.Control
                                    placeholder="Enter id of article..."
                                    onChange={changeHandlerId}
                                >

                                </Form.Control>
                                <Button onClick={findArticle} className="mt-3">Search</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={9}>
                <Card border="dark">
                    <Card.Header>Correction fields:</Card.Header>
                        <Card.Body>
                            {paper && <Form>
                                <Form.Label size="sm">base</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    size="sm"
                                    defaultValue={paper.base} 
                                    onChange={changeHandlerPaper}
                                    name="base"
                                    disabled
                                />
                                <Form.Label className="mt-1" size="sm">eid</Form.Label>
                                <Form.Control 
                                    type="text"
                                    size="sm" 
                                    defaultValue={paper.eid} 
                                    onChange={changeHandlerPaper}
                                    name="eid"
                                    disabled
                                />
                                <Form.Label className="mt-1" size="sm">type</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    size="sm"
                                    defaultValue={paper.type} 
                                    onChange={changeHandlerPaper}
                                    name="type"
                                    disabled
                                />
                                <Form.Label className="mt-1" size="sm">source</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    size="sm"
                                    defaultValue={paper.journal} 
                                    onChange={changeHandlerPaper}
                                    name="journal"
                                    disabled
                                />
                                <Form.Label className="mt-1" size="sm">Our authors</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    size="sm"
                                    defaultValue={paper.ourAuthors} 
                                    onChange={changeHandlerPaper}
                                    name="ourAuthors"
                                />
                                <Form.Label className="mt-1" size="sm">Our authors IDs</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    size="sm"
                                    defaultValue={paper.ourAuthorsId} 
                                    onChange={changeHandlerPaper}
                                    name="ourAuthorsId"
                                />
                                <Form.Label className="mt-1" size="sm">doi</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    size="sm"
                                    defaultValue={paper.doi} 
                                    onChange={changeHandlerPaper}
                                    name="doi"
                                />
                                <Form.Label className="mt-1" size="sm">year</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    size="sm"
                                    defaultValue={paper.year} 
                                    onChange={changeHandlerPaper}
                                    name="year"
                                />
                                <Form.Label className="mt-1" size="sm">frezee</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    size="sm"
                                    defaultValue={paper.frezee} 
                                    onChange={changeHandlerPaper}
                                    name="frezee"
                                />
                                <Form.Label className="mt-1" size="sm">new</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    size="sm"
                                    defaultValue={paper.new} 
                                    onChange={changeHandlerPaper}
                                    name="new"
                                    disabled
                                />
                            </Form>}
                        </Card.Body>
                        <Card.Footer>
                            <Button onClick={updatePaper}>Update Paper</Button>
                            <Button onClick={deletePaper} className="ml-3">Delete Paper</Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}