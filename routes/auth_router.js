const {validateImei} = require('../controllers/auth_controller');
const router = require('express').Router();

router.post('/validate', validateImei);

module.exports = router;