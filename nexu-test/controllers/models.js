const mongoose = require("mongoose") //importamos mongoose
const Model = mongoose.model("Model")//se importa modelo "Model"

function listAllModelsbyPrice(req,res,next){
  //{average_price: { $gt: 380000, $lt: 400000 }}
  let range = {};
  const {greater,lower} = req.query;
  if (greater && lower) { 
    range = {$gt: greater, $lt: lower};
  } else if (lower) {
    range = {$lt: lower};
  } else if (greater) {
    range = {$gt: greater};
  }
  
  if (Object.keys(range).length !== 0) { //se valida si range NO está vacio para realizar el filtrado por precio
    Model.find({ average_price: range }, '-_id name average_price')
      .then((modelos) => {
        res.send(modelos);
      }).catch(next);
  } else { //si range está vacio, se mandan todos los campos
    Model.find().then(modelos => {
      res.send(modelos)
    }).catch(next)
  }
}

/* function listModelsbyId(req, res, next){
  if(req.params.id){
    Model.findById(req.params.id).then(modelo => {
        res.send(modelo)
      }).catch(next)
  } else {
    Model.find().then(modelos => {
      res.send(modelos)
    }).catch(next)
  }  
}
*/

function editAVGPrice(req,res,next){
  const {average_price} = req.body;
  if (average_price <= 100000){
      return res.status(400).json({msg:'Invalid average_price'});
  }
  if(mongoose.Types.ObjectId.isValid(req.params.id)){
    Model.findByIdAndUpdate(req.params.id, {average_price}, {new: true})
    .then(modelo => {
        res.send(modelo)
      }).catch(next)
  }else {
    return res.status(404).json({msg:'Not found'});
  }  
}

function addNewBrand(req,res,next){
  const {brand_name} = req.body;
  Model.findOne({brand_name})
    .then(brand => {
      if (brand) {
        return res.status(400).json({msg:'Brand already exists'});
      }
      const brandName = new Model({brand_name});
      return brandName.save().then(b =>{
        res.status(200).send(b)
    }).catch(next) 
    }).catch(next);
}

function addNewModel(req,res,next){ 
  const {name, average_price} = req.body;
  if(mongoose.Types.ObjectId.isValid(req.params.id)){
    Model.findById(req.params.id)
      .then(b => {
        return Model.findOne({ brand_name: b.brand_name, name });
      }).then(model => {
        if (model) { //If the model name already exists for that brand return a response code and error message reflecting it.
          return res.status(400).json({msg:'Model already exists'});
        }
        if (average_price && average_price <= 100000) { //si existe un precio se valida que sea mayor a 100000
          return res.status(400).json({msg:'Invalid average_price'});
        }
        Model.findByIdAndUpdate(req.params.id, {name, average_price}, {new: true})
        .then(modelo =>{
          res.send(modelo)
          res.status(200).send(newModelName)
        }).catch(next) 

      }).catch(next)
  }else { 
    return res.status(404).json({msg:'Not found'});
  }  
}


function listAllBrands(req, res, next){
  Model.aggregate([
    { 
      $group: { 
        _id: "$brand_name", //se agrupan los documentos por brand_name
        average_price: {$avg: "$average_price"} //se calcula el precio promedio de la agrupación por brand_name
      } 
    }, 
    { 
      $project: {
        brand_name: "$_id",
        _id: 0,
        average_price: 1
      } 
    }
  ]).sort({brand_name:1}) //se ordena de manera ascendente
  .then(brands => {
    res.send(brands)
  }).catch(next)
}

function listAllModelsOfBrand(req, res, next){
  const {brand_name} = req.params;
  Model.find({brand_name}, '-_id id name average_price') //se muestra el id, nombre del modelo y el precio promedio
  .then(modelos => {
    res.send(modelos)
  }).catch(next)
}


// exportamos las funciones definidas
module.exports = {
  listAllModelsbyPrice,
  editAVGPrice,
  addNewBrand,
  addNewModel,
  listAllBrands,
  listAllModelsOfBrand
}