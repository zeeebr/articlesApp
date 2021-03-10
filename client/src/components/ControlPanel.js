import React, { useState } from 'react'
import { useHttp } from '../hooks/http'
import { useMessage } from '../hooks/message'
import { Card, Button } from 'react-bootstrap'

export const ControlPanel = () => {
    const { request } = useHttp()
    const message = useMessage()

    const writeNewId = async () => {
        let resp = await request('/paper/write_new', 'GET')
        message(resp.message)
    }

    const resetNewId = async () => {
        let resp = await request('/paper/reset_new', 'GET')
        message(resp.message)
    }

    return(
        <Card border="dark" className="mt-3">
            <Card.Header>Control Panel</Card.Header>
                <Card.Body>
                    <Button 
                        onClick={writeNewId}
                    >
                        Write new identificators
                    </Button>
                    <Button 
                        onClick={resetNewId}
                        className="ml-2"
                    >
                        Reset
                    </Button>
                </Card.Body>
        </Card>
    )
}

export default ControlPanel