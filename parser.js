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
const levenshtein = require('js-levenshtein')

affil.sync()
paper.sync()

async function parser(csvData) {
    let base, existTopics

    //console.log(csvData)

    if (csvData[0]['EID']) {
        base = 'scopus'
        // create list of all topics for finding duplicates between bases
        existTopics = await paper.topicList('wos')
    } else if (csvData[0]['UT']) {
        base = 'wos'
        existTopics = await paper.topicList('scopus')
    } else {
        console.log(`WTF? 'base' not found in parser.js!`)
        return
    }
    
    let existId = await paper.idList(base)

    for (let i in csvData) {
        let data = {}

        if (base == 'scopus') {
            let eid = csvData[i]['EID'].substr(7)
            if (existId.has(eid)) continue

            let ourAuthors = await getOurAuthors(csvData[i], base)
            let ourAuthorsId = await getOurAuthorsId(ourAuthors)
            let { percent, duplicate } = await findDuplicate(existTopics, csvData[i]['Название'])

            data['eid'] = eid
            data['base'] = base
            data['type'] = csvData[i]['Тип документа']
            data['topic'] = csvData[i]['Название']
            data['doi'] = csvData[i]['DOI']
            data['duplicate'] = duplicate
            data['percent'] = percent
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
            let eid = csvData[i]['UT'].substr(4)
            if (existId.has(eid)) continue

            let ourAuthors = await getOurAuthors(csvData[i], base)
            let ourAuthorsId = await getOurAuthorsId(ourAuthors)
            let { percent, duplicate } = await findDuplicate(existTopics, csvData[i]['TI'])

            data['eid'] = eid
            data['base'] = base
            data['type'] = csvData[i]['DT']
            data['topic'] = csvData[i]['TI']
            data['doi'] = csvData[i]['DI']
            data['duplicate'] = duplicate
            data['percent'] = percent
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
        }
        
        await paper.save(data)
    }

    console.log('done')
    return true
}

async function getOurAuthors(data, base) {
    if (base == 'scopus') {
        let arrAuthors = data['Авторы'].split(', ')
        console.log(arrAuthors)
        let arrAffils = data['Авторы организаций'].split('; ')
        console.log(arrAffils)
        let arrOurAuthors = []
        for (let i in arrAffils) {
            let element = arrAffils[i].toLowerCase()
            console.log(element)
            let str = arrAuthors[i]
            console.log(str)
            let correctName = str.split(' ')[0][0] + str.split(' ')[0].substring(1).toLowerCase() + ' ' + str.split(' ')[1]
            if (await checkOurAffil(element, base)) arrOurAuthors.push(correctName)
        }
        let ourAuthors = arrOurAuthors.join(', ')

        return ourAuthors
    } else if (base == 'wos') {
        let arrAffils = data['C1'].split('; [')
        let arrOurAuthors = []
        for (let i in arrAffils) {
            let element = arrAffils[i].toLowerCase()
            
            let testAffil = element.split('] ')[1]
            
            if (await checkOurAffil(testAffil, base)) {
                if (arrAffils[i][0] != '[') {
                    arrAffils[i] = '[' + arrAffils[i]
                }
    
                let regexpBreckets = arrAffils[i].match(/\[(.*)\]/) || []
    
                if (regexpBreckets[1]) {
                    let nameSplit = regexpBreckets[1].split('; ')
                    for (let k in nameSplit) {
                        let removeComms = nameSplit[k].replace(',', '')
                        let correctName = removeComms.split(/\s+/).map((w,i) => i ? w.substring(0,1).toUpperCase() + '.' : w + ' ').join('')
                        arrOurAuthors.push(correctName)
                    }
                }
            }
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
    let existOurAuthors = await author.findAll()
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

async function findDuplicate(existTopics, topic) {
    let duplicate = existTopics.get(topic)
    
    if (duplicate) return { percent: 100, duplicate: duplicate }
    
    let arrCompare = []

    for (let [key, value] of existTopics.entries()) {
        let compare = Math.round((topic.length - levenshtein(topic.toLowerCase(), key.toLowerCase())) / topic.length * 100)
        
        arrCompare.push(compare)

        if (compare > 90) {
            //console.log(compare, value)
            return { percent: compare, duplicate: value }
        }
    }

    if (arrCompare.length == 0) return { percent: 33, duplicate: null }

    let maxCompare = getMaxOfArray(arrCompare)

    return { percent: maxCompare, duplicate: null }
}

function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray)
}

module.exports = {
    parser: parser,
    getOurAuthorsId: getOurAuthorsId
}