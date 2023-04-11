//llama la librería de express y le asigna una constante
const express = require('express');
const bodyParser = require('body-parser');
//Asigna una variable para la express y le asigna una constante
const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false })

//invocamos a la coneccion que se hace a traves de cliente
const pool= require('./database/db');

router.get('/',(req,res)=>{
    res.render('index')
})

router.get('/create', async (req, res) => {
    let client;
    try {
        client = await pool.connect();
        const results = await client.query('SELECT * FROM autores ORDER BY codigo_autor ASC');
        res.render('create', { results: results.rows});
    } catch (error) {
        throw error;
    }
});

//ruta para crear registros


router.get('/create', (req, res)=> {
    res.render('create')
})
//lamamos el crud en controllers de la exportacion exports.save
const crud= require('./controllers/crud');
router.post('/create',crud.save, (req, res)=> {
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

router.get('/edit/:codigo_autor', async (req, res) => {
    const cod_autor = req.params.codigo_autor;   
    let client;
    try {
        client = await pool.connect()
        const results = await client.query('SELECT * FROM autores WHERE codigo_autor=$1', [cod_autor]);
        res.render('edit', { autor: results.rows });
    } catch (error) {
        throw error;
    }
});
router.post('/update', crud.update);

router.get('/delete/:codigo_autor',async (req, res) => {
    const cod_autor = req.params.codigo_autor;
    let client;
    try {
        client = await pool.connect()
        resultado = await client.query('DELETE FROM autores WHERE codigo_autor = $1',[cod_autor]);

        if(resultado = true){
            req.flash('success', 'Autor Eliminado Correctamente')
            res.redirect('/create');
        }
    }catch(error){
        throw error;
    }

});
//vamos a exportar el archivo router.js
module.exports = router
