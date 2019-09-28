const path = require('path');

const express = require('express');

const blood_controller = require('../controllers/blood_controller');

const router = express.Router();

// /admin/add-product => GET
router.get('/index', blood_controller.getIndex);

module.exports = router;
