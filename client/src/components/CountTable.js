import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http'
import { Table } from 'react-bootstrap'

const CountTable = () => {
    const [count, setCount] = useState({ year1: 2021 })
    const { request } = useHttp()

    useEffect(() => {
        const interval = setInterval(() => {
            counter()
        }, 1000)
        
        return () => clearInterval(interval)    
    })

    const counter = async () => {
        let response = await request('/count')
        
        if (response) {
            setCount(response)
        }
    }

    return(
        <>
        {count.scopus && 
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th width="12.5%">#</th>
                        <th width="12.5%">{count.year1 - 5}</th>
                        <th width="12.5%">{count.year1 - 4}</th>
                        <th width="12.5%">{count.year1 - 3}</th>
                        <th width="12.5%">{count.year1 - 2}</th>
                        <th width="12.5%">{count.year1 - 1}</th>
                        <th width="12.5%">{count.year1}</th>
                        <th width="12.5%">ALL</th>
                    </tr>
                </thead>
            
                <tbody>
                    <tr>
                        <td>WoS</td>
                        <td>{count.wos['6']}<sup>&nbsp;{count.wos_new['6'] > 0 ? '+'+count.wos_new['6'] : ''}</sup></td>
                        <td>{count.wos['5']}<sup>&nbsp;{count.wos_new['5'] > 0 ? '+'+count.wos_new['5'] : ''}</sup></td>
                        <td>{count.wos['4']}<sup>&nbsp;{count.wos_new['4'] > 0 ? '+'+count.wos_new['4'] : ''}</sup></td>
                        <td>{count.wos['3']}<sup>&nbsp;{count.wos_new['3'] > 0 ? '+'+count.wos_new['3'] : ''}</sup></td>
                        <td>{count.wos['2']}<sup>&nbsp;{count.wos_new['2'] > 0 ? '+'+count.wos_new['2'] : ''}</sup></td>
                        <td>{count.wos['1']}<sup>&nbsp;{count.wos_new['1'] > 0 ? '+'+count.wos_new['1'] : ''}</sup></td>
                        <td>{count.wos['1'] + count.wos['2']+ count.wos['3'] + count.wos['4'] + count.wos['5'] + count.wos['6']}</td>
                    </tr>
                    <tr>
                        <td>Scopus</td>
                        <td>{count.scopus['6']}<sup>&nbsp;{count.scopus_new['6'] > 0 ? '+'+count.scopus_new['6'] : ''}</sup></td>
                        <td>{count.scopus['5']}<sup>&nbsp;{count.scopus_new['5'] > 0 ? '+'+count.scopus_new['5'] : ''}</sup></td>
                        <td>{count.scopus['4']}<sup>&nbsp;{count.scopus_new['4'] > 0 ? '+'+count.scopus_new['4'] : ''}</sup></td>
                        <td>{count.scopus['3']}<sup>&nbsp;{count.scopus_new['3'] > 0 ? '+'+count.scopus_new['3'] : ''}</sup></td>
                        <td>{count.scopus['2']}<sup>&nbsp;{count.scopus_new['2'] > 0 ? '+'+count.scopus_new['2'] : ''}</sup></td>
                        <td>{count.scopus['1']}<sup>&nbsp;{count.scopus_new['1'] > 0 ? '+'+count.scopus_new['1'] : ''}</sup></td>
                        <td>{count.scopus['1'] + count.scopus['2']+ count.scopus['3'] + count.scopus['4'] + count.scopus['5'] + count.scopus['6']}</td>
                    </tr>
                    <tr>
                        <td>All</td>
                        <td>{count.scopus['6'] + count.wos['6']}</td>
                        <td>{count.scopus['5'] + count.wos['5']}</td>
                        <td>{count.scopus['4'] + count.wos['4']}</td>
                        <td>{count.scopus['3'] + count.wos['3']}</td>
                        <td>{count.scopus['2'] + count.wos['2']}</td>
                        <td>{count.scopus['1'] + count.wos['1']}</td>
                        <td>{count.scopus['1'] + count.scopus['2']+ count.scopus['3'] + count.scopus['4'] + count.scopus['5'] + count.scopus['6'] + count.wos['1'] + count.wos['2']+ count.wos['3'] + count.wos['4'] + count.wos['5'] + count.wos['6']}</td>
                    </tr>
                </tbody>
            </Table>
        }
        </>
    )
}

export default CountTable