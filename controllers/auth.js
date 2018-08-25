module.exports.login = (req, res)=>{
    res.status(200).json({login: 'login from controller'})
}

module.exports.register = (req, res)=>{
    res.status(200).json({login: 'register from controller'})
}