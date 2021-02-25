import React, { useState, useEffect } from 'react'
import CSVReader from 'react-csv-reader'
import { useHttp } from '../hooks/http'
import { useMessage } from '../hooks/message'
import { Card, Container, Row, Col, Button, Form } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'

export const Author = () => {
    const [data, setData] = useState(null)
    const [alias, setAlias] = useState(null)
    const [arrOfAuthors, setArrOfAuthors] = useState([])
    const [author, setAuthor] = useState({ id: '', name: '', alias: '', inst: '', cathedra: '', frezee: ''})
    const { loading, request, error, clearError } = useHttp()
    const message = useMessage()

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        getListOfAuthors()
    }, [])
    const parseOptions = { header: true }

    const getListOfAuthors = async () => {
        let resp = await request('/author/list', 'GET')
        
        setArrOfAuthors(resp)
    }

    const postCsv = async () => {
        let resp = await request('/author/add_csv', 'POST', data)
        message(resp.message)
    }

    const updateAuthor = async () => {
        let resp = await request('/author/update', 'POST', author)
        message(resp.message)
    }

    const findAuthor = async () => {
        setAuthor(null)
        let resp = await request('/author/find_one', 'POST', new Array(alias))
        if(resp) {
            setAuthor({
                id: resp.id,
                name: resp.name,
                alias: resp.alias,
                inst: resp.inst,
                cathedra: resp.cathedra,
                frezee: resp.frezee
            })
        }  
    }

    const changeHandlerAlias = event => {
        setAlias(event.target.value)
    }

    const changeHandlerAuthor = event => {
        setAuthor({ ...author, [event.target.name]: event.target.value })
    }

    return(
        <Container fluid>
            <Row>
                <Col sm={3}>
                    <Card border="dark">
                        <Card.Header>Import CSV file (Authors)</Card.Header>
                            <Card.Body>
                                <CSVReader 
                                    onFileLoaded={data => setData(data)} 
                                    parserOptions={parseOptions}
                                />
                                {data && <Button onClick={postCsv} className="mt-3">Submit</Button>}
                            </Card.Body>
                    </Card>

                    <Card border="dark" className="mt-3">
                        <Card.Header>Correction of exist author:</Card.Header>
                            <Card.Body>
                                <Form.Label>Alias:</Form.Label>
                                <Typeahead
                                    id="allAliases"
                                    onChange={(selected) => {
                                        setAlias(selected)
                                    }}
                                    placeholder="Enter alias of author (on russian)" 
                                    name="alias"
                                    options={arrOfAuthors} 
                                />
                                <Form className="mt-3">
                                    <Button onClick={findAuthor}>Search</Button>
                                </Form>
                            </Card.Body>
                    </Card>
                </Col>
                <Col sm={9}>
                    <Card border="dark">
                        <Card.Header>Correction fields</Card.Header>
                        <Card.Body>
                            {author && <Form>
                                <Form.Label>Id</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    defaultValue={author.id} 
                                    onChange={changeHandlerAuthor}
                                    name="name"
                                    disabled
                                />
                                <Form.Label>Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    defaultValue={author.name} 
                                    onChange={changeHandlerAuthor}
                                    name="name"
                                />
                                <Form.Label className="mt-3">Alias</Form.Label>
                                <Form.Control 
                                    type="text"  
                                    defaultValue={author.alias} 
                                    onChange={changeHandlerAuthor}
                                    name="alias"
                                />
                                <Form.Label className="mt-3">Institute</Form.Label>
                                <Form.Control 
                                    type="text"  
                                    defaultValue={author.inst} 
                                    onChange={changeHandlerAuthor}
                                    name="inst"
                                />
                                <Form.Label className="mt-3">Cathedra</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    defaultValue={author.cathedra} 
                                    onChange={changeHandlerAuthor}
                                    name="cathedra"
                                />
                                <Form.Label className="mt-3">Frezee</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    defaultValue={author.frezee} 
                                    onChange={changeHandlerAuthor}
                                    name="frezee"
                                />
                            </Form>}
                        </Card.Body>
                        <Card.Footer>
                            <Button onClick={updateAuthor}>Update Author</Button>
                        </Card.Footer>
                    </Card>
                    
                </Col>
            </Row>
        </Container>
    )
}