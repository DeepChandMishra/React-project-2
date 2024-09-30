const express = require('express');
const cors = require('cors');
const UserRoutes = require('./route/UserRoutes');
const dbConfig = require('./dbconfig/dbConfig'); 

const app = express();
const PORT =8000;

app.use(express.json());
app.use(cors());

app.use('/api', UserRoutes);

app.listen(PORT, () => console.log(`Server created at http://localhost:${PORT}`));
