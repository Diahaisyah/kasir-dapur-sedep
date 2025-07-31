
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const transaksiRoutes = require('./routes/transaksiRoutes');

app.use(cors());
app.use(bodyParser.json());

app.use('/api/transaksi', transaksiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
