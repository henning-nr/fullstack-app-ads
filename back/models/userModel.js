const db = require('../db/database')
const bcrypt = require('bcryptjs')

function findUserByUsername(username, callback){
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row)=>{
        callback(err,row)
    })
}

async function createUser(username, password, callback){
    const hashedPassword = await bcrypt.hash(password, 10)
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err)=>{
        callback(err, {id: this?.lastID, username})
    })
}

module.exports = {findUserByUsername, createUser}