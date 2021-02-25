import React from 'react'
import Affils from '../components/Affils'

import { Container, Row, Col } from 'react-bootstrap'

export const Affil = () => {
    

    return(
        <Container fluid>
            <Row>
                <Col sm={6}><Affils base='scopus' /></Col>
                <Col sm={6}><Affils base='wos' /></Col>
            </Row>
        </Container>
    )
}