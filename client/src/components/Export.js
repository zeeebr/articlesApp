import React, { useState } from 'react'
import { useHttp } from '../hooks/http'
import { Card, Button, Form } from 'react-bootstrap'
import jsonToCsv from './JsonToCsv'

export const Export = () => {
    const [data, setData] = useState(null)
    const { request } = useHttp()

    const getNewPapers = async () => {
        let resp = await request('/paper/export', 'GET')

        if(resp.length === 0) {
            setData('no data for export :(')
        } else {
            let csvData = jsonToCsv(resp)
            setData(csvData)
        }
    }

    return(
        <Card border="dark" className="mt-3">
            <Card.Header>Export new articles:</Card.Header>
                <Card.Body>
                    <Button 
                        onClick={getNewPapers}
                    >
                        export
                    </Button>
                    {data && <Form.Control
                        as="textarea"
                        className="mt-3"
                        rows={4} 
                        style={{ resize: 'none' }}
                        defaultValue={data}
                    />}
                </Card.Body>
        </Card>
    )
}

export default Export