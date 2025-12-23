import express from 'express';
import { corsConfigs } from './config/corsconfig.js';
import connectDB from './libs/db.js';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express'
import fs from 'fs'

const app = express();

app.use(express.json());
app.use(corsConfigs);
app.use(cookieParser());

//swagger doc
const swaggerDoc = JSON.parse(fs.readFileSync('./swagger.json', 'utf-8'))
app.use('/apis-doc', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

// public
app.get('/', (req, res) => {
  res.send('Hello World!');
});

import { APIs_v1 } from './routes/v1/index.js'
app.use('/api', APIs_v1);



const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
});