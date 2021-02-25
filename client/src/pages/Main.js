import React from 'react'
import CountTable from '../components/CountTable'
import ImportCsv from '../components/ImportCsv'
import ControlPanel from '../components/ControlPanel'
import { Container, Row, Col } from 'react-bootstrap'

export const Main = () => {
    

    return(
        <Container fluid>
            <Row>
                <Col sm={8}><CountTable /></Col>
                <Col sm={4}><ImportCsv /><ControlPanel /></Col>
            </Row>
        </Container>
        
    )
}