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
    technologies_user_front:{
        type: String,
        required: false
    },
     technologies_user_back:{
        type: String,
        required: false
    },
     technologies_user_uiux:{
        type: String,
        required: false
    },
    technologies_user_mobile:{
        type: String,
        required: false
    },
     technologies_user_desktop:{
        type: String,
        required: false
    },
    link_photo_profile:{
        type: String,
        required: false
    },
    name_project_primary:{
        type: String,
        required: false
    },
    link_photo_project_primary:{
        type: String,
        required: false
    }, 
    name_project_second:{
        type: String,
        required: false
    },    
    link_photo_project_scond:{
        type: String,
        required: false
    },
    name_project_three:{
        type: String,
        required: false
    },
    link_photo_project_three:{
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
