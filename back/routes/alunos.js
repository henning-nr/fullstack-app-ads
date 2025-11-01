var express = require('express');
var router = express.Router();
var authenticateToken = require('../middleware/auth')
var {findStudentById, createStudent, getStudents, deleteStudent, updateStudent} = require('../models/studentModel')

// BANCO DE DADOS
const alunos = [
  {nome: "henning", idade: 40, matricula: 123456}
]

/* GET alunos API. */
router.get('/',authenticateToken, function(req, res, next) {
  getStudents((err, students)=>{
    if(err){
      console.error('getStudents erro:', err.message)
      return res.status(500).json({error: 'Erro ao buscar alunos'})
    }

    return res.status(200).json({alunos: students})
  })
});

/* GET alunos pelo ID API. */
router.get('/:id', function(req, res, next) {
  const id = req.params.id
  console.log("veio", id)
  findStudentById(id, (err, student)=>{
    if(err){
      console.error('findStudentById erro:', err.message)
      return res.status(500).json({error: 'Erro ao buscar aluno'})
    }

    if(!student){
      return res.status(404).json({error: 'Aluno não encontrado'})
    }

    return res.status(200).json({aluno: student})
  })
});

/* POST alunos API. */
router.post('/',authenticateToken, function(req, res, next) {
  // aceitar tanto { name } quanto { nameStudent } para compatibilidade
  const name = req.body.name || req.body.nameStudent
  const gender = req.body.gender
  const age = req.body.age
  const code = req.body.code

  console.log('veio', { name, gender, age, code })

  createStudent(name, gender, age, code, (err, newStudent)=>{
    if(err){
      console.error('createStudent erro:', err.message)
      return res.status(500).json({error: 'Erro ao salvar aluno'})
    }

    return res.status(201).json({message: 'Usuário criado com sucesso', aluno: newStudent})
  })
});

// DELETE aluno API.
router.delete('/:id',authenticateToken, function(req, res){
  const id = req.params.id
  deleteStudent(id, (err)=>{
    if(err){
      console.error('deleteStudent erro:', err.message)
      return res.status(500).json({error: 'Erro ao deletar aluno'})
    }

    return res.status(200).json({message: 'Aluno deletado com sucesso'})
  })
})

router.put('/:id',authenticateToken, function(req, res){
  const id = req.params.id
  const { name, gender, age, code } = req.body

  updateStudent(id, name, gender, age, code, (err)=>{
    if(err){
      console.error('updateStudent erro:', err.message)
      return res.status(500).json({error: 'Erro ao atualizar aluno'})
    }

    return res.status(200).json({message: 'Aluno atualizado com sucesso'})
  })
})

module.exports = router;
