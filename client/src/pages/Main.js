import React from 'react'
import CountTable from '../components/CountTable'
import ImportCsv from '../components/ImportCsv'
import { Container, Row, Col } from 'react-bootstrap'

export const Main = () => {
    

    return(
        <Container fluid>
            <Row>
                <Col sm={8}><CountTable /></Col>
                <Col sm={4}><ImportCsv /></Col>
                
            </Row>
        </Container>
        
    )
}