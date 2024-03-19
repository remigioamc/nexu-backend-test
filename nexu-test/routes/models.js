// Estructura del CRUD
const router = require('express').Router(); //se importa librería router de express
const {
  listAllModelsbyPrice,
  editAVGPrice,
  addNewBrand,
  addNewModel,
  listAllBrands,
  listAllModelsOfBrand
} = require('../controllers/models')

router.get('/brands', listAllBrands) 
router.get('/brands/:brand_name/models', listAllModelsOfBrand) 
router.post('/brands', addNewBrand)
router.post('/brands/:id/models', addNewModel) 
router.put('/models/:id', editAVGPrice) 
router.get('/models', listAllModelsbyPrice)

module.exports = router;