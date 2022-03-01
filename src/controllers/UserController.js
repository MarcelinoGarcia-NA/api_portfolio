User = require("../models/User");
const jwt = require('jsonwebtoken');
const authconfig= require("../config/auth.json");
const nodemailer= require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');

function generateToken(params={}){
    return jwt.sign(params, authconfig.secret,{
        expiresIn:86400,
    });
}
module.exports = {
    
    async store(req, res) {
        if (await User.findOne({ email: req.body.email })) {
            return res.status(400).json({ error: "Usuário já encontrado na base de dados!" });
        }
        const user = await User.create(req.body);
        return res.json({user, token: generateToken({id: user.id})});
    },
    async update(req, res) {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json(user);
    }, 
    async list(req, res){
        const user= await User.find();
        return res.json(user);
    },
    async destroy(req, res){
        const user= await User.deleteOne({_id: req.params.id});
        return res.json({message:"Usuário removido do banco de dados!"});
    },
    async finduser(req,res){
        const user= await User.find({_id: req.params.id});
        return res.json(user);
    },
    async reaginAccess(req, res) {
      const user = await User.findOne({email: req.params.email});
      const hash = await bcrypt.hash(req.body.password,10);
      req.body.password = hash;
      const userUpdate = await User.findByIdAndUpdate(user._id, req.body, { new: true });
      return res.json({userUpdate, token: generateToken({id: user.id})});
    }, 
    async submitEmailRegainAccess(req,res){
      const codigo = Math.round(Math.random() * 4000);
      const transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: 'novamusicna@gmail.com',
          pass: 'novamusicifms'
        }
      }));
      
      const mailOptions = {
        from: 'novamusicna@gmail.com',
        to:  req.body.email ,
        subject: 'NOVA MUSIC',
        text: 'código de verificação é :'+ codigo
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });  

      return res.json(codigo);

      
    },
}