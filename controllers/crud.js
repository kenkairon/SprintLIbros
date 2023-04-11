const conexion= require('../database/db');

exports.save = (req,res)=>{    
    const nombre= req.body.txtNombre;
    const apellido=req.body.txtApellido;
    const fecha_nac=req.body.txtFechanac;
    const fecha_muerte=req.body.txtFechamuerte;
    conexion.query('INSERT INTO autores (nombre_autor,apellido_autor,fecha_nacimiento,fecha_muerte) VALUES ($1, $2, $3, $4) RETURNING *', [nombre, apellido, fecha_nac,fecha_muerte], (error, results) => {
     
      if (error) {
          console.log(error);
        } else {
          req.flash('success', 'Autor Agregado Correctamente')
          res.redirect('/create');
        }
      })
}
exports.update = (req, res) => {
    const cod_autor = req.body.txtCodigo_autor;
    const nombre= req.body.txtNombre;
    const apellido=req.body.txtApellido;
    const fecha_nac=req.body.txtFechanac;
    const fecha_muerte=req.body.txtFechamuerte;

    conexion.query('UPDATE autores SET nombre_autor=$1, apellido_autor=$2, fecha_nacimiento=$3, fecha_muerte=$4 WHERE codigo_autor=$5', [nombre, apellido, fecha_nac, fecha_muerte, cod_autor], (error, result) => {
      if (error) {
        console.log(error);
      } else {
        req.flash('success', 'Autor Editado Correctamente')
        res.redirect('/create');
      }
    })
}
