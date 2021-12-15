import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http'
import { Table } from 'react-bootstrap'
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, LabelList } from 'recharts'

const CountTable = () => {
    const [count, setCount] = useState({ year1: 2022 })
    const [data, setData] = useState()
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
            
            let arrData = []

            for (let i = 6; i > 0; i--) {
                arrData.push({
                    year: response.year1 - i + 1,
                    scopus: response.scopus[i],
                    wos: response.wos[i]
                })
            }
            console.log(arrData)
            setData(arrData)
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
        { data && 
            <ResponsiveContainer width="100%" height="70%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="wos" fill="#1E90FF">
                        <LabelList dataKey="wos" position="top" />
                    </Bar>
                    <Bar dataKey="scopus" fill="#e9711c">
                        <LabelList dataKey="scopus" position="top" />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        }
        </>
    )
}

export default CountTable