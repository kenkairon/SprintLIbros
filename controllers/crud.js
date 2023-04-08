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
          res.redirect('/');
        }
      })
}
exports.update = (req, res) => {
    const id = req.body.id;
    const estudiante = req.body.estudiante;
    const rut = req.body.rut;
    const curso = req.body.curso;
    const nivel = req.body.nivel;

    conexion.query('UPDATE estudiantes SET nombre=$1, rut=$2, curso=$3, nivel=$4 WHERE id=$5', [estudiante, rut, curso, nivel, id], (error, result) => {
      if (error) {
        console.log(error);
      } else {
        req.flash('success', 'Estudiante Editado Correctamente')
        res.redirect('/');
      }
    })
}
