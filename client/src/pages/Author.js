import React, { useState, useEffect } from 'react'
import CSVReader from 'react-csv-reader'
import { useHttp } from '../hooks/http'
import { useMessage } from '../hooks/message'
import { Card, Container, Row, Col, Button, Form, Spinner } from 'react-bootstrap'
import { Typeahead, ClearButton } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css'

export const Author = () => {
    const [data, setData] = useState(null)
    const [name, setName] = useState(null)
    const [alias, setAlias] = useState(null)
    const [arrOfNames, setArrOfNames] = useState([])
    const [arrOfAliases, setArrOfAliases] = useState([])
    const [author, setAuthor] = useState({ id: '', name: '', alias: '', inst: '', cathedra: '', frezee: ''})
    const { loading, request, error, clearError } = useHttp()
    const message = useMessage()

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        getListOfNames()
        getListOfAliases()
    }, [author])

    const parseOptions = { header: true }

    const getListOfNames = async () => {
        let resp = await request('/author/list_names')
        
        setArrOfNames(resp)
    }

    const getListOfAliases = async () => {
        let resp = await request('/author/list_aliases')
        
        setArrOfAliases(resp)
    }

    const postCsv = async () => {
        let resp = await request('/author/add_csv', 'POST', data)
        message(resp.message)
    }

    const updateAuthor = async () => {
        let resp = await request('/author/update', 'POST', author)
        message(resp.message)
    }

    const addAuthor = async () => {
        let data = {
            name: author.name, 
            alias: author.alias, 
            inst: author.inst, 
            cathedra: author.cathedra, 
            frezee: true
        }
        
        let resp = await request('/author/add', 'POST', data)
        
        message(resp.message)

        setAuthor({
            id: resp.data.id,
            name: resp.data.name,
            alias: resp.data.alias,
            inst: resp.data.inst,
            cathedra: resp.data.cathedra,
            frezee: resp.data.frezee
        })
    }

    const deleteAuthor = async () => {
        let resp = await request('/author/delete', 'POST', author)  
        message(resp.message)
        setAuthor({ id: '', name: '', alias: '', inst: '', cathedra: '', frezee: ''})
    }

    const findAuthorByName = async () => {
        let resp = await request('/author/find_one_by_name', 'POST', { name: name })
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

    const findAuthorByAlias = async () => {
        let resp = await request('/author/find_one_by_alias', 'POST', { alias: alias })
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

    const changeHandlerAuthor = event => {
        setAuthor({ ...author, [event.target.name]: event.target.value })
    }

    return(
        <Container fluid>
            <Row>
                <Col sm={3}>
                    <Card border="dark">
                        <Card.Header>Correction of exist author (by name):</Card.Header>
                        <Card.Body>
                            <Form.Label>Name:</Form.Label>
                            <Typeahead
                                id="listOfAuthors"
                                onChange={(selected) => {
                                    setName(selected)
                                }}
                                placeholder="Enter name of author..." 
                                name="name"
                                options={arrOfNames} 
                            >
                                {({ onClear, selected }) => (
                                    <div className="rbt-aux">
                                        {!!selected.length && <ClearButton onClick={onClear} />}
                                        {!selected.length && <Spinner animation="grow" size="sm" />}
                                    </div>
                                )}
                            </Typeahead>
                            <Form className="mt-3">
                                <Button onClick={findAuthorByName}>Search</Button>
                            </Form>
                        </Card.Body>
                    </Card>

                    <Card border="dark" className="mt-3">
                        <Card.Header>Correction of exist author (by alias):</Card.Header>
                        <Card.Body>
                            <Form.Label>Alias:</Form.Label>
                            <Typeahead
                                id="listOfAliases"
                                onChange={(selected) => {
                                    setAlias(selected)
                                }}
                                placeholder="Enter alias of author (on russian)..." 
                                name="alias"
                                options={arrOfAliases} 
                            >
                                {({ onClear, selected }) => (
                                    <div className="rbt-aux">
                                        {!!selected.length && <ClearButton onClick={onClear} />}
                                        {!selected.length && <Spinner animation="grow" size="sm" />}
                                    </div>
                                )}
                            </Typeahead>
                            <Form className="mt-3">
                                <Button onClick={findAuthorByAlias}>Search</Button>
                            </Form>
                        </Card.Body>
                    </Card>

                    <Card border="dark" className="mt-3">
                        <Card.Header>Import CSV file (Authors)</Card.Header>
                            <Card.Body>
                                <CSVReader 
                                    onFileLoaded={data => setData(data)} 
                                    parserOptions={parseOptions}
                                />
                                {data && <Button onClick={postCsv} className="mt-3">Submit</Button>}
                            </Card.Body>
                    </Card>
                </Col>
                <Col sm={9}>
                    <Card border="dark">
                        <Card.Header>Correction fields</Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Label>Id</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={author.id} 
                                    onChange={changeHandlerAuthor}
                                    name="name"
                                    disabled
                                />
                                <Form.Label>Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={author.name} 
                                    onChange={changeHandlerAuthor}
                                    name="name"
                                />
                                <Form.Label className="mt-3">Alias</Form.Label>
                                <Form.Control 
                                    type="text"  
                                    value={author.alias} 
                                    onChange={changeHandlerAuthor}
                                    name="alias"
                                />
                                <Form.Label className="mt-3">Institute</Form.Label>
                                <Form.Control 
                                    type="text"  
                                    value={author.inst} 
                                    onChange={changeHandlerAuthor}
                                    name="inst"
                                />
                                <Form.Label className="mt-3">Cathedra</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={author.cathedra} 
                                    onChange={changeHandlerAuthor}
                                    name="cathedra"
                                />
                                <Form.Label className="mt-3">Frezee</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={author.frezee} 
                                    onChange={changeHandlerAuthor}
                                    name="frezee"
                                />
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <Button 
                                onClick={updateAuthor}
                            >
                                Update Author
                            </Button>
                            <Button 
                                onClick={() => setAuthor({ id: '', name: '', alias: '', inst: '', cathedra: '', frezee: ''})}
                                className="ml-3"
                            >
                                Clear
                            </Button>
                            <Button 
                                onClick={addAuthor}
                                className="ml-3"
                            >
                                Add Author
                            </Button>
                            <Button 
                                onClick={deleteAuthor}
                                className="ml-3"
                            >
                                Delete Author
                            </Button>
                        </Card.Footer>
                    </Card>
                    
                </Col>
            </Row>
        </Container>
    )
}