const express = require('express');
const router = express.Router();
const accountsMethods = require('./methods');

router.post('/register', async (req, res) => {
    try {
        const user = await accountsMethods.registerUser(req.body);
        res.status(200).json({
            message: 'Usuario registrado exitosamente.',
            data: user.nickname
        });
    }catch (error) {
        res.status(400).json(error);
    }
});

router.post('/login',async (req, res) => {
    
    const {user, password} = req.body;
    
    try {
        const accessToken = await accountsMethods.loginUser(user, password);
        if (!accessToken) throw new error('Token inválido.');
        res.status(200).json(accessToken);
    }catch (error) {
        res.status(404)
        .send("Nombre de usuario o contraseña incorrecta.");
    }
       
});

module.exports = router;