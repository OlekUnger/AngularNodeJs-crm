const bcrypt = require('bcryptjs'); //для шифрования паролей
const jwt = require('jsonwebtoken');//генерация токена
const User = require('../models/user');
const keys = require('../config/keys')


module.exports.login = async(req, res)=>{
    //проверка на существование пользователя
    const candidate = await User.findOne({email: req.body.email});

    if(candidate) {
        // Проверка пароля, если пользователь существует
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if(passwordResult){
            //генерируем токен если пароль совпадает
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            },keys.jwt, {expiresIn: 60*60});
            res.status(200).json({token: `Bearer ${token}`})
        } else {
            //пароли не совпали
            res.status(401).json({
                message: 'Пароли не совпадают'
            })
        }
    }  else {
        res.status(404).json({
            message: 'Пользователь с таким email не найден'
        })
    }
    // email: req.body.email,
        // password: req.body.password

};

module.exports.register = async (req, res)=>{
    //проверка на существование пользователя

    const candidate = await User.findOne({email: req.body.email});

    if(candidate) {
        // Пользователь существует, нужно отправить ошибку
        res.status(409).json({
            message: 'Email занят'
        })
    } else {
        // Нужно создать пользователя
        //генерируем хэш для пароля
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;

        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })
        try {
            await user.save();
            res.status(201).json(user);
        } catch (e) {
            // обработать ошибку
        }

    }
};