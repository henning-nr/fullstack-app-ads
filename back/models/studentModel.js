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
    
    // Verificar se já existe um estudante com o mesmo nome
    db.get('SELECT 1 FROM students WHERE name = ? LIMIT 1', [name], (err, existingStudent) => {
        if(err){
            console.error('Erro ao verificar duplicata:', err.message)
            return callback(err)
        }
        
        if(existingStudent){
            // Retornar erro específico para nome duplicado
            const duplicateError = new Error('Já existe um aluno com este nome')
            duplicateError.code = 'DUPLICATE_NAME'
            return callback(duplicateError)
        }
        
        // Se não existe, inserir o novo estudante
        db.run(
            'INSERT INTO students (name, gender, age, code) VALUES (?, ?, ?, ?)',[name, gender , age , code ], function(err){
                if(err){
                    console.error('Erro ao inserir student:', err.message)
                    return callback(err)
                }

                const newStudent = { id: this.lastID, name, gender, age, code }
                callback(null, newStudent)
            }
        )
    })
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

module.exports = {findStudentById, createStudent, getStudents, deleteStudent}