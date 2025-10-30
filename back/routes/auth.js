const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {findUserByUsername, createUser} = require('../models/userModel')
const router = express.Router()

router.post('/register',(req, res)=>{
    const {username, password} = req.body

    findUserByUsername(username, async (err, user)=>{
        if(err){
            return res.status(500).json({error: 'Erro no banco de dados'})
        }
        if(user){
            return res.status(400).json({message: 'Usuário já existe'})
        }
    })

    createUser(username, password, (err, newUser)=>{
        if(err){
            return res.status(500).json({error: 'Erro ao criar usuário'})
        }
        res.status(201).json({message: 'Usuário criado com sucesso', user: newUser})
    })
})

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  findUserByUsername(username, async (err, user) => {
    if (err) return res.status(500).json({ error: 'Erro no banco de dados' });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Senha incorreta' });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ message: 'Login bem-sucedido', token });
  });
});

module.exports = router;