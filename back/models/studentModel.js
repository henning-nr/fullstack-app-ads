const db = require('../db/database')

// Pegar estudante pelo ID
function findStudentById(id, callback){
    db.get('SELECT * FROM students WHERE id = ?', [id], (err, row)=>{
        callback(err,row)
    })
}

// Pegar todos os estudantes
function getStudents(callback){
    db.all('SELECT * FROM students', [], (err, rows)=>{
        callback(err, rows)
    })
}

// Criar um novo estudante
function createStudent(name, gender, age, code, callback){
    console.log('salvando no banco', name)
    db.run(
        'INSERT INTO students (name, gender, age, code) VALUES (?, ?, ?, ?)',[name, gender , age , code ], (err)=>{
            if(err){
                console.error('Erro ao inserir student:', err.message)
                return callback(err)
            }

            const newStudent = { name }
            callback(null, newStudent)
        }
    )
}

function deleteStudent(id, callback){
    db.run(
        'DELETE FROM students WHERE id = ?',[id], (err)=>{
            if(err){
                console.error('Erro ao deletar student:', err.message)
                return callback(err)
            }

            callback(null)
        }
    )
}

function updateStudent(id, name, gender, age, code, callback){
    db.run(
        'UPDATE students SET name = ?, gender = ?, age = ?, code = ? WHERE id = ?',
        [name, gender, age, code, id],
        (err)=>{
            if(err){
                console.error('Erro ao atualizar student:', err.message)
                return callback(err)
            }

            callback(null)
        }
    )
}

module.exports = {findStudentById, createStudent, getStudents, deleteStudent, updateStudent}