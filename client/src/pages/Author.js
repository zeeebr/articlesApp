import React, { useState, useEffect } from 'react'
import CSVReader from 'react-csv-reader'
import { useHttp } from '../hooks/http'
import { useMessage } from '../hooks/message'

export const Author = () => {
    const [data, setData] = useState(null)
    const [alias, setAlias] = useState(null)
    const [author, setAuthor] = useState(null)
    const { loading, request, error, clearError } = useHttp()
    const message = useMessage()

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const parseOptions = { header: true }

    const postCsv = async () => {
        let resp = await request('/author/add_csv', 'POST', data)
        message(resp.message)
    }

    const findAuthor = async () => {
        let data = new Array(alias)
        let resp = await request('/author/find_one', 'POST', data)
        if(resp) {
            setAuthor({
                name: resp.name,
                alias: resp.alias,
                inst: resp.inst,
                cathedra: resp.cathedra,
                frezee: resp.frezee
            })
        }  
    }

    const changeHandler = event => {
        setAlias(event.target.value)
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
                        <span className="card-title">Upload CSV file with authors</span>
                    </div>
                    <div className="card-action">
                        <CSVReader 
                            onFileLoaded={data => setData(data)} 
                            parserOptions={parseOptions}
                        />
                        {data && <div><br /><button onClick={postCsv}>Submit</button>&nbsp;&nbsp;&nbsp;<button onClick={clearData}>Clear</button></div>}
                    </div>
                </div>
            </div>
            <div className="col s12 m6">
                <div className="card teal darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Edit author card</span>
                        <label forHtml="last_name">alias</label>
                        <input id="last_name" type="text" class="validate" onChange={changeHandler} />
                        <button onClick={findAuthor}>Search</button>
                    </div>
                    <div className="card-action">
                        {author && 
                            <div>
                                <textarea id="name" type="text" className="textarea" value={author.name} />
                                <input id="alias" type="text" class="validate" value={author.alias} />
                            </div>
                        }
                        
                    </div>
                </div>
            </div>              
        </div>
    )
}