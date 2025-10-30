const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./db/database.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco', err.message)
    } else {
        console.log('Banco conectado')
    }
})

db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )
`)

module.exports = db