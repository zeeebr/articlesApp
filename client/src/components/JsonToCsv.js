const { Parser } = require('json2csv')

function JsonToCsv(data) {
    const json2csvParser = new Parser({ delimiter: '\t', eol: '\n', header: false})
    const csv = json2csvParser.parse(data)
    
    return csv
}

export default JsonToCsv