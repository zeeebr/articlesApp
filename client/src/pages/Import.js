import React, { useState } from 'react'
import CSVReader from 'react-csv-reader'
import { useHttp } from '../hooks/http'

export const Import = () => {
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

    const clearData = () => {
        setData(null)
    }

    return(
        <div className="row">
            <br />
            <div className="col s12 m6">
                <div className="card teal darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Upload CSV file</span>
                        <label>Select base:</label>
                        <select className="browser-default" onChange={(e) => setBase(e.target.value)}>
                            <option value="" disabled selected>Choose your option</option>
                            <option value="scopus">Scopus</option>
                            <option value="wos">Web of Science</option>
                        </select>
                    </div>
                    <div className="card-action">
                        {base && <CSVReader 
                            onFileLoaded={data => setData(data)} 
                            parserOptions={parseOptions(base)}
                        />}
                        {data && <div><br /><button onClick={postCsv}>Submit</button>&nbsp;&nbsp;&nbsp;<button onClick={clearData}>Clear</button></div>}
                    </div>
                </div>
            </div>            
        </div>
    )
}