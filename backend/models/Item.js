const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({ 
    name: { type: String, required: true }, 
    description: { type: String, required: true }, 
    price: {type:Number,required:true},
    category: { 
        type: String, 
        required: true,
        enum: ['vehicle', 'cloths', 'foods', 'house']
    },
    customerReviewCount: { type: Number},
    imageUrl: { type: String },
},
    // TODO: Add price field here },
     { timestamps: true }); 
     
     module.exports = mongoose.model('Item', ItemSchema);