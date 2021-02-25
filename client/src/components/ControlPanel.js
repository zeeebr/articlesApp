import React, { useState } from 'react'
import { useHttp } from '../hooks/http'
import { Card, Button } from 'react-bootstrap'

export const ControlPanel = () => {
    const { request } = useHttp()

    const writeNewId = async () => {
        await request('/paper/write_new', 'GET')
    }

    const resetNewId = async () => {
        await request('/paper/reset_new', 'GET')
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