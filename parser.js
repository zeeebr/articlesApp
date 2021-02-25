const {
    Paper
} = require('./models/paper')
const paper = new Paper()
const {
    Affil
} = require('./models/affil')
const {
    Author
} = require('./models/author')
const author = new Author()
const affil = new Affil()


affil.sync()
paper.sync()

async function parser(csvData) {
    let base

    if (csvData[0]['EID']) {
        base = 'scopus'
    } else if (csvData[0]['UT']) {
        base = 'wos'
    }
    
    let existId = await paper.idList(base)
    
    for (let i in csvData) {
        let data = {}

        if (base == 'scopus') {
            let eid = csvData[i]['EID']
            if (existId.has(eid)) continue

            let ourAuthors = await getOurAuthors(csvData[i], base)
            let ourAuthorsId = await getOurAuthorsId(ourAuthors)

            data['eid'] = eid
            data['base'] = base
            data['type'] = csvData[i]['Тип документа']
            data['topic'] = csvData[i]['Название']
            data['doi'] = csvData[i]['DOI']
            data['journal'] = csvData[i]['Название источника']
            data['issn'] = (csvData[i]['ISSN'] != '') ? `${csvData[i]['ISSN']}` : csvData[i]['ISBN']
            data['volume'] = csvData[i]['Том']
            data['issue'] = csvData[i]['Выпуск ']
            data['pages'] = (csvData[i]['Страница начала'] != '' && csvData[i]['Страница окончания'] != '') ? `${csvData[i]['Страница начала']}-${csvData[i]['Страница окончания']}` : csvData[i]['Статья №']
            data['author'] = csvData[i]['Авторы']
            data['ourAuthors'] = ourAuthors
            data['ourAuthorsId'] = ourAuthorsId
            data['affil'] = csvData[i]['Авторы организаций']
            data['year'] = csvData[i]['Год']
            data['frezee'] = false
            data['new'] = true
        } else if (base == 'wos') {
            let eid = csvData[i]['UT']
            if (existId.has(eid)) continue

            let ourAuthors = await getOurAuthors(csvData[i], base)
            let ourAuthorsId = await getOurAuthorsId(ourAuthors)

            data['eid'] = eid
            data['base'] = base
            data['type'] = csvData[i]['DT']
            data['topic'] = csvData[i]['TI']
            data['doi'] = csvData[i]['DI']
            data['journal'] = csvData[i]['SO']
            data['issn'] = (csvData[i]['SN'] != '') ? `${csvData[i]['SN']}` : csvData[i]['EI']
            data['volume'] = csvData[i]['VL']
            data['issue'] = csvData[i]['IS']
            data['pages'] = (csvData[i]['BP'] != '' && csvData[i]['EP'] != '') ? `${csvData[i]['BP']}-${csvData[i]['EP']}` : csvData[i]['AR']
            data['author'] = csvData[i]['AF']
            data['ourAuthors'] = ourAuthors
            data['ourAuthorsId'] = ourAuthorsId
            data['affil'] = csvData[i]['C1']
            data['year'] = csvData[i]['PY']
            data['frezee'] = false
            data['new'] = true
        } else {
            console.log(`WTF? base = ${base}`)
        }
        
        await paper.save(data)
    }

    console.log('done')
    return true
}

async function getOurAuthors(data, base) {
    if (base == 'scopus') {
        let arrAuthors = data['Авторы'].split(', ')
        let arrAffils = data['Авторы организаций'].split('; ')
        let arrOurAuthors = []
        for (let i in arrAffils) {
            let element = arrAffils[i].toLowerCase()
            if (await checkOurAffil(element, base)) arrOurAuthors.push(arrAuthors[i])
        }
        let ourAuthors = arrOurAuthors.join(', ')

        return ourAuthors
    } else if (base == 'wos') {
        let arrAffils = data['C1'].split('; [')
        let arrOurAuthors = []
        for (let i in arrAffils) {
            let element = arrAffils[i].toLowerCase()
            if (await checkOurAffil(element, base)) arrOurAuthors.push(arrAffils[i])
        }
        let ourAuthors = arrOurAuthors.join(', ')

        return ourAuthors
    }
}

async function checkOurAffil(data, base) {
    let existAffils = await affil.list(base)

    for (let i in existAffils) {
        let arrLength = existAffils[i].length
        let count = 0
        for (let k in existAffils[i]) {
            if (data.includes(existAffils[i][k])) count = count + 1
        }
        if (arrLength == count) return true
    }

    return false
}

async function getOurAuthorsId(ourAuthors) {
    let existOurAuthors = await author.list()
    let existOurAuthorsMap = new Map()

    existOurAuthors.forEach((element) => {
        let full = element.name.split(' ')
        let initals = full[1].split('.')
        
        if (initals.length == 3) {
            let fullName = full[0] + ' ' + initals[0].substring(0, 1) + '.' + initals[1].substring(0, 1) + '.'
            existOurAuthorsMap.set(fullName, element.id)
            
            let shortName = full[0] + ' ' + initals[0].substring(0, 1) + '.'
            existOurAuthorsMap.set(shortName, element.id)
        }  else if (initals.length == 2) {
            let shortName = full[0] + ' ' + initals[0].substring(0, 1) + '.'
            existOurAuthorsMap.set(shortName, element.id)
        } else {
            console.log(`Some error in parse of name ${element.name}...`)
        }
    })
    
    let authors = ourAuthors.split(', ')

    let ourAuthorsId = []
 
    for (let i in authors) {
        let id = existOurAuthorsMap.get(authors[i])
        if (id) {
            ourAuthorsId.push(id)
        } else {
            ourAuthorsId.push(null)
        }
    }    
    
    return ourAuthorsId
}

module.exports = parser