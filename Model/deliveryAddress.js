const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    houseNo : {type : String ,required : true},
    street : {type : String , required : true},
    landMark : {type : String},
    city : {type : String,required : true},
    district : {type : String,required : true},
    state : {type : String,required : true},
    pincode : {type : String,required : true},
},
{ timestamps: true }
)

module.exports = mongoose.model('CustomerAddress', addressSchema);