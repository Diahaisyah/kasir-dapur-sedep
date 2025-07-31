
const pool = require('../db');
const { Parser } = require('json2csv');

exports.buatTransaksi = async (req, res) => {
  const { nama_pelanggan, metode_pembayaran, tipe_pesanan, total, diskon, ongkir, detail } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO transaksi (nama_pelanggan, metode_pembayaran, tipe_pesanan, total, diskon, ongkir, detail) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
      [nama_pelanggan, metode_pembayaran, tipe_pesanan, total, diskon, ongkir, JSON.stringify(detail)]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.ambilSemuaTransaksi = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM transaksi ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.eksporTransaksi = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM transaksi');
    const json2csv = new Parser();
    const csv = json2csv.parse(result.rows);
    res.header('Content-Type', 'text/csv');
    res.attachment('transaksi.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
