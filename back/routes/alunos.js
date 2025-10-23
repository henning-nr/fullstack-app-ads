var express = require('express');
var router = express.Router();

// BANCO DE DADOS
alunos = [
  {nome: "henning", idade: 40, matricula: 123456}
]

/* GET alunos API. */
router.get('/', function(req, res, next) {
  res.send( { alunos });
});

/* POST alunos API. */
router.post('/', function(req, res, next) {
  dados = req.body
  console.log('veio', dados)
  res.send( { alunos });
});

module.exports = router;
