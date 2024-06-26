import express from 'express'
import productRoutes from './routes/productsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import {db} from './config/db.js'
import dotenv from 'dotenv'
import cors from 'cors'
import colors from 'colors'

//Habilitar variables de entorno
dotenv.config();

//create app
const app = express();

//Allow read data via body
app.use(express.json());

//add in cors options avoids urls
const whiteList = process.argv[2] === '--postman' ? [process.env.FRONTEND_URL, undefined] : [process.env.FRONTEND_URL]

const corsOptions = {
    origin: function(origin, callback){
        //console.log(origin);
        if(whiteList.includes(origin)){
            //allow
            callback(null, true);
        }else{
            //dont allow
            callback(new Error('Error de CORS'))
        }
    }
}

//use cors
app.use(cors(corsOptions))

//Connect DB
db();


//define routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);


//define port
const PORT = process.env.PORT || 4000; //first option for the hosting if is necessary

//start app
app.listen(PORT, () => {
    console.log(colors.blue('Server working on PORT: ', PORT));
})