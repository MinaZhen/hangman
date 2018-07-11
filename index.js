const express = require('express')
const bodyParser = require('body-parser')
const Hangman = require('./src/logic-es6')


const port = process.argv[2] || 3000

const app = express()
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false })) 
app.set('view engine', 'pug')

let hangman;
let error;
let sprites = [];
let sprite = "";

app.get('/', (req, res) => {
    hangman = undefined
    sprites = []
    sprite = ""
    res.render('index', {error})
})

app.get('/game', (req, res) => {
    const {  query : { error } } = req
    if (hangman === undefined) {
        hangman = new Hangman()
        swattempts(hangman.attempts())
        sprite = sprites[0]
    }

    let i = sprites.length - 1 - hangman.attempts()
    sprite = sprites[i]
    res.render('game', {error, hangman, sprite})
})


app.get('/two-players', (req, res) => {
    const {  query : { error } } = req

    res.render('two-players', { error })
})


app.post('/initial-word', (req, res) => {
    const { body: { word, attempts } } = req
    const att = parseInt(attempts)
    try {
        hangman = new Hangman(word.toUpperCase(), att)
        swattempts(att) 
        sprite = sprites[0]
    } catch ({ message }) {
        res.redirect(`/two-players?error=${message}`)
    }

    res.redirect('/game')
})

app.post("/try", (req, res) => {
    const { body: { text } } = req

    try {
        hangman.try(text)
    } catch ({ message }) {
        res.redirect(`/game?error=${message}`)
    }
    
    res.redirect('/game')
})

function swattempts(tryes) {
    switch(tryes){
        case 5: sprites =  ["00", "01", "06", "08", "10", "15"]
            break;
        case 6: sprites =  ["00", "01", "06", "08", "10", "12", "15"] 
            break;
        case 7: sprites =  ["00", "01", "06", "08", "09", "10", "12", "15"]
            break;
        case 8: sprites =  ["00", "01", "03", "06", "08", "09", "10", "12", "15"]
            break;
        case 9: sprites =  ["00", "01", "02", "03", "06", "08", "10", "11", "12", "15"]
            break;
        case 10: sprites =  ["00", "01", "02", "03", "06", "08", "09", "10", "11", "12", "15"]
            break;
        case 11: sprites =  ["00", "01", "02", "03", "06", "07", "08", "09", "10", "11", "12", "15"]
            break;
        case 12: sprites =  ["00", "01", "02", "03", "06", "07", "08", "09", "10", "11", "12", "13", "15"]
            break;
        case 13: sprites =  ["00", "01", "02", "03", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15"]
            break;
        case 14: sprites =  ["00", "01", "02", "03", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15"]
            break;
        case 15: sprites =  ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15"]
            break;
        default: console.error("DEFAULT")
            break;
    }
}

app.listen(port, () => console.log(`server running on port ${port}`))

process.on('SIGINT', () => {
    console.log('\nstopping server')

    process.exit()
})