const {
    Paper
} = require('./models/paper')
const paper = new Paper()
const {
    Author
} = require('./models/author')
const author = new Author()

async function exportPapers() {
    let data = await paper.export()

    let newPapers = []

    for (let i in data) {
        // one author - one line
        for (let k in data[i].ourAuthorsId) {
            let arr

            if (data[i].ourAuthorsId[k]) {
                let authorData = await author.findOneById(data[i].ourAuthorsId[k])
                arr = {
                    alias: authorData.alias,
                    inst: authorData.inst,
                    cathedra: authorData.cathedra
                }
            } else {
                arr = {
                    alias: data[i].ourAuthors.split(', ')[k],
                    inst: '???',
                    cathedra: '???'
                }
            }

            if (data[i].base == 'scopus') {
                let paper = {
                    Индекс: 'Scopus',
                    Тип: data[i].type === "Article" ? "Журнал" : (data[i].type === "Conference Paper" ? "Конференция" : data[i].type),
                    ИФ: '',
                    Квартиль: '',
                    Издание: data[i].journal,
                    Проверка: '',
                    Статья: data[i].topic,
                    DOI: data[i].doi,
                    Идентификатор: data[i].eid,
                    ID: '',
                    Name: '',
                    Макрос: '',
                    Дубляж: '',
                    Номер: ((data[i].volume) ? `Volume ${data[i].volume}` : '') + ((data[i].volume) && (data[i].issue) ? `, Issue ${+data[i].issue}` : ((data[i].issue) ? `Issue ${+data[i].issue}` : '')),
                    Страницы: data[i].pages,
                    Автор: arr.alias,
                    Институт: arr.inst,
                    Кафедра: arr.cathedra,
                    Год: data[i].year,
                    Pscreen: '',
                    Перевод: data[i]['ourAuthors']
                }

                newPapers.push(paper)
            } else if (data[i].base == 'wos') {
                let journalName = data[i].journal[0].toUpperCase() + data[i].journal.toLowerCase().slice(1)
                let topic

                if (testCaps(data[i].topic)) {
                    topic = data[i].topic[0].toUpperCase() + data[i].topic.toLowerCase().slice(1)
                } else {
                    topic = data[i].topic
                }
                
                let paper = {
                    Индекс: 'WoS',
                    Тип: data[i].type === "Article" ? "Журнал" : (data[i].type === "Proceedings Paper" ? "Конференция" : data[i].type),
                    ИФ: '',
                    Квартиль: '',
                    Издание: journalName,
                    Проверка: '',
                    Статья: topic,
                    DOI: data[i].doi,
                    Идентификатор: data[i].eid,
                    ID: '',
                    Name: '',
                    Макрос: '',
                    Дубляж: '',
                    Номер: ((data[i].volume) ? `Volume ${data[i].volume}` : '') + ((data[i].volume) && (data[i].issue) ? `, Issue ${data[i].issue}` : ((data[i].issue) ? `Issue ${data[i].issue}` : '')),
                    Страницы: data[i].pages,
                    Автор: arr.alias,
                    Институт: arr.inst,
                    Кафедра: arr.cathedra,
                    Год: data[i].year,
                    Pscreen: '',
                    Перевод: data[i]['ourAuthors']
                }
                
                newPapers.push(paper)
            } else {
                console.log(`WTF in exportPapers.js?`)
            }
        }
    }

    return newPapers
}

function testCaps (str) {
    let count = 0
    for (let i in str) {
        if (str[i] == str[i].toUpperCase()) count = count + 1
    }
    if (str.length == count) {
        return true
    } else {
        return false
    }
}

module.exports = exportPapers