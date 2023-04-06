const { check } = require('express-validator') //TODO <---
const { validateResult } = require('../helpers/validatehelpers')

const validateCreate = [ 
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
    check('nivel')
        .exists()
        .isNumeric(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreate }