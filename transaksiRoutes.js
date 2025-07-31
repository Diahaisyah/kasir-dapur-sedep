
const express = require('express');
const router = express.Router();
const transaksiController = require('../controllers/transaksiController');

router.post('/', transaksiController.buatTransaksi);
router.get('/', transaksiController.ambilSemuaTransaksi);
router.get('/export', transaksiController.eksporTransaksi);

module.exports = router;
