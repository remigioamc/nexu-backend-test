var router=require('express').Router();

router.get('/', (req,res) => {
    res.send('Welcome to Nexu API')
})
//Se definen las rutas
router.use('/',require('./models')); //se importa el archivo models.js donde están definidas las rutas

module.exports=router;

