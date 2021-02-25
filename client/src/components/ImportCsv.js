import React, { useState } from 'react'
import CSVReader from 'react-csv-reader'
import { useHttp } from '../hooks/http'
import { Card, Form, Button } from 'react-bootstrap'

export const ImportCsv = () => {
    const [data, setData] = useState(null)
    const [base, setBase] = useState(null)

    const { request } = useHttp()
    
    
    const parseOptions = (base) => {
        if (base == 'scopus') {
            return({ 
                header: true,
                skipEmptyLines: true 
            })
        } else if (base == 'wos') {
            return({ 
                header: true,
                quoteChar: "",
                delimiter: "\t",
                skipEmptyLines: true
            })
        }
    }

    const postCsv = async () => {
        await request('/paper/parser', 'POST', data)
    }

    return(
        <Card border="dark">
            <Card.Header>Import CSV file</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group controlId="exampleForm.SelectCustom">
                            <Form.Label>Select base:</Form.Label>
                            <Form.Control as="select" defaultValue="choose" onChange={(e) => setBase(e.target.value)} custom>
                                <option value="choose" disabled>Choose your option</option>
                                <option value="scopus">Scopus</option>
                                <option value="wos">Web of Science</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                    {base && <CSVReader 
                        onFileLoaded={data => setData(data)} 
                        parserOptions={parseOptions(base)}
                    />}
                    {data && <div><Button className="mt-3" onClick={postCsv}>Submit</Button></div>}
                </Card.Body>
        </Card>
    )
}

export default ImportCsv