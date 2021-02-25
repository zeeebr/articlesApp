import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http'
import { Card, Button, Form, Col } from 'react-bootstrap'

export const Affils = (props) => {
    const [affils, setAffils] = useState([])
    const [newAffil, setNewAffil] = useState()
    
    const { request } = useHttp()
    
    useEffect(() => { 
        getAffils()
    }, [])

    const getAffils = async () => {
        let data = await request('/affil/list', 'POST', { base: props.base })
        
        setAffils(data)
    }

    const delAffils = async (affil, base) => {
        let data = await request('/affil/delete', 'DELETE', { 
            base: base,
            affil: affil 
        })
        
        setAffils(data)
    }

    const addAffil = async () => {
        let arr = newAffil.replace(' ', '').split(',')
        
        let data = await request('/affil/add', 'POST', { 
            base: props.base, 
            affil: arr 
        })

        setAffils(data)
        setNewAffil('')
    }

    const changeHandler = event => {
        setNewAffil(event.target.value)
    }

    const rowsAffils = affils.map((item) => {
        return (
            <Form key={item} className="mb-1">
                <Form.Row>
                    <Col sm={10}>
                        <Form.Control as="textarea" size="sm" rows={1} style={{ resize: 'none' }} defaultValue={item} />
                    </Col>
                    <Col sm={2}>
                        <Button onClick={() => delAffils(item, props.base)} size="sm">delete</Button>
                    </Col>
                </Form.Row>
            </Form>
        )
    })

    return(
        <Card border="dark">
            <Card.Header>{(props.base === 'scopus') ? 'Scopus' : 'Web of Science'} affiliations:</Card.Header>
                <Card.Body>
                    {rowsAffils}
                </Card.Body>
                <Card.Footer>
                    <Form className="mt-3">
                        <Form.Row>
                            <Col sm={10}>
                                <Form.Control 
                                    type="affil" 
                                    placeholder="Enter new affiliation (keywords separated by commas)" 
                                    name="affil"
                                    value={newAffil}
                                    onChange={changeHandler}
                                    size="sm"
                                />
                            </Col>
                            <Col sm={2}>
                                <Button 
                                    onClick={() => addAffil()}
                                    size="sm"
                                >
                                    add
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Card.Footer>
        </Card>
    )
}

export default Affils