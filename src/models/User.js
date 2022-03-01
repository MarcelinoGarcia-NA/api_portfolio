const {Schema, model}= require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema= new Schema(
    {
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase:true
    },
    password:{
        type: String,
        required: true,
        select:false
    },
    name_user_portfolio:{
        type: String,
        required: true,
        unique: true,
    },
    name_user_complete:{
        type: String,
        required: true,
        unique: true,
    },
    telephone:{
        type: String,
        required: true
    },
    activ_primary:{
        type: String,
        required: false
    },
    activ_second:{
        type: String,
        required: false
    },
    link_primary:{
        type: String,
        required: false
    },
    link_second:{
        type: String,
        required: false
    },
    desc_profile:{
        type: String,
        required: false
    },
    phrase_profile:{
        type: String,
        required: false
    },
    formation_title:{
        type: String,
        required: false
    },
    formation_name_inst:{
        type: String,
        required: false
    },
    specialization:{
        type: String,
        required: false
    },
    specialization:{
        type: String,
        required: false
    },
    technologies_user:{
        type: String,
        required: false
    },
    link_photo_profile:{
        type: String,
        required: false
    },
    link_cv:{
        type: String,
        required: false
    },
    isAdmin:{
        type: Boolean,
        default:false
    },
    },

    {
        timestamps:true
    }

);

UserSchema.pre('save',async function(next){
    const hash = await bcrypt.hash(this.password,10);
    this.password = hash;

    next();
});

    module.exports =model("User",UserSchema);