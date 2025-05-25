const express = require('express');
const app = express();
const PORT = 8080;
const { dbConnection } = require('./config/config');
const routes = require('./routes');
const swaggerUI = require('swagger-ui-express');
const docs = require('./docs/index.js');

app.use(express.json());

app.use('/', routes);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));

dbConnection();

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));