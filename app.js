//invocar a librería de express
const express = require('express');
//Asignamos a una constante
const app = express();
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

//Motor de plantillas o setting
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static('public'))

//Esta función middleware se utiliza para analizar los datos enviados
//en una solicitud HTTP POST o PUT y extraer los datos de la carga útil del cuerpo de la solicitud.//

//invocamos dotev
//3-invocamos a dotenv
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

//middwares
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//empezar un sesion
app.use(session({

	secret:'12345',
	resave:false,
	saveUninitialized:false

}));
app.use(flash());

// Configuración de express-flash

app.use((req, res, next) => {
    app.locals.messages = req.flash('success');
    next();
});
//es para usar en la carpeta app import
app.use('/', require('./router'));


//Escuchamos al servidor
app.listen(5300, ()=>{
	console.log('Servicio corriendo en http://localhost:5300');
});


