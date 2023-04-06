const conexion= require('../database/db');

exports.save = (req,res)=>{

    const estudiante= req.body.estudiante;
    const rut = req.body.rut;
    const curso =req.body.curso;
    const nivel=req.body.nivel;
    conexion.query('INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *', [estudiante, rut, curso, nivel], (error, results) => {
        if (error) {
          console.log(error);
        } else {
          req.flash('success', 'Estudiante Agregado Correctamente')
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
