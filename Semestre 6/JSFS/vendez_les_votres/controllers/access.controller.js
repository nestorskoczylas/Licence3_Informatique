const bcrypt = require('bcrypt');
const User = require('../models/user.model').model;

const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');


/*
* fournit en résultat une vue qui gère le formulaire d'inscription
*/
//const registerForm = (_,res) => res.redirect('/register.html');
const registerForm =   (_,res) => res.render('createUser', { title : "Gestion du compte" } );
/*
* crée l'entrée correspondant à l'utilisateur à partir des informations fournies
* le mot de passe est crypté avant d'être stocké en base
*/
const register = async (req, res) => {
  // hash password using bcrypt
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  console.log(`register , body.login : ${req.body.login}`);

  try {
    const userData = {
                        ...req.body,
                        password: hashPassword   // replace password by crypted version
                     };
    const newUser = await User.create(userData); // save user in the database
    delete userData.password;                    // password is not sent back in request
    console.log('utilisateur créé');
    res.status(201).json(userData);
  }
  catch (err){
    console.log(`pb création utilisateur ${err.message}`);
    res.status(409).json({ message : err.message });
  }
}

/*
* fournit en résultat une vue qui gère le formulaire d'identification
*/
//const loginForm = (_,res) => res.redirect('/login.html'); 
const loginForm = (_,res) => res.render('login', { title : "Gestion du compte" } );
/*
* cherche s'il existe un utilisateur correspondant aux identifiants/mot de passe fournis
* si c'est le cas un jeton JWT est créé et renvoyé
*/
const login = async (req, res) => {
  try {
    // check if user exist
    const user = await User.findOne( { login : req.body.login });
    if (user) {
      // check password
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) // wrong password
        return res.status(401).json({ message : 'mot de passe incorrect.'});

      // create and send token
      const token = jwt.sign({id: user._id}, jwtConfig.SECRET_TOKEN, {expiresIn : '120s'} );
      res.cookie('token', token,  { maxAge : 120000, httpOnly: true, sameSite : 'strict' })  // secure : true (avec https)
      res.status(200).json({ message : 'utilisateur connecté' });
    }
    else { // unknown login
      console.log(`user ${req.body.login} inconnu`);
      res.status(401).json({ message : `utilisateur ${req.body.login} inconnu`});
    }
  }
  catch (err) {
    console.log(`pb connexion ${err.message}`);
    res.status(500).redirect('/access/register');
  }
}

const logout = (req,res) => {
  res.cookie('token', '',  { maxAge : 2000, httpOnly: true, sameSite : 'strict' }) // secure : true
  res.status(200).json({ message : 'utilisateur déconnecté' });
}

module.exports.login = login;
module.exports.loginForm = loginForm;
module.exports.register = register;
module.exports.registerForm = registerForm;
module.exports.logout = logout;
