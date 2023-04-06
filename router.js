//llama la librería de express y le asigna una constante
const express = require('express');
const bodyParser = require('body-parser');
//Asigna una variable para la express y le asigna una constante
const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const { check, validationResult } = require('express-validator')
//invocamos a la coneccion que se hace a traves de cliente
const pool= require('./database/db');



router.get('/', async (req, res) => {
    let client;
    try {       
        client = await pool.connect();
        const results = await client.query('SELECT * FROM autores ORDER BY codigo_autor ASC');
        res.render('index', { results: results.rows});
    } catch (error) {
        throw error;
    }finally {
        // Liberar el cliente obtenido de la piscina de conexiones
        client.release();
    }
});

//ruta para crear registros


router.get('/create', (req, res)=> {
    res.render('create')
})
//lamamos el crud en controllers de la exportacion exports.save
const crud= require('./controllers/crud');
router.post('/create',urlencodedParser, [
    check('estudiante')
    .exists()
    .not()
    .isLength({ min: 20 })
    .isEmpty(),
check('rut')
    .exists()
    .isNumeric()
    .isLength({ min: 10 }),
check('curso')
    .exists(),
    check('nivel').notEmpty().isInt(),
],crud.save, (req, res)=> {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        // return res.status(422).jsonp(errors.array())
        const alert = errors.array()
        console.log(alert);
        res.render('save', {
            alert
        })
    }
});

//ruta para editar los registros

router.get('/edit/:id', async (req, res) => {
    const codigo = req.params.codigo;
    let client;
    try {        
        client = await pool.connect()
        const results = await client.query('SELECT * FROM autores WHERE id=$1', [codigo]);             
        res.render('edit', { est: results.rows });
    } catch (error) {
        throw error;
    }finally {
        // Liberar el cliente obtenido de la piscina de conexiones
        client.release();
    }
});
router.post('/update', crud.update);

router.get('/delete/:id',async (req, res) => {
    const codigo = req.params.codigo;
    let client;
    try {        
        client = await pool.connect()
        resultado = await client.query('DELETE FROM autores WHERE codigo_autor = $1',[codigo]);
       
        if(resultado = true){
            req.flash('success', 'Autor Eliminado Correctamente')
            res.redirect('/');
        }
    }catch(error){
        throw error;
    }finally {
        // Liberar el cliente obtenido de la piscina de conexiones
        client.release();
    }

});
//vamos a exportar el archivo router.js
module.exports = router
