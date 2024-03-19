const mongoose = require('mongoose'); // se importa mongoose
const ModelSchema = new mongoose.Schema({      
  id: Number,                              
  name: String,
  average_price: Number, 
  brand_name: String
}, { timestamps: true, versionKey: false, collection: 'models' });

ModelSchema.methods.publicData = () => { //devuelve los datos públicos del Schema
  return {
    id: this.id,
    name: this.name ,
    average_price: this.average_price,
    brand_name: this.brand_name,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

mongoose.model("Model", ModelSchema); 