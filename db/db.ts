import { Sequelize } from "sequelize"
import dotenv from 'dotenv';
import { NodeEnv } from "../enums/config";

dotenv.config();

let connection_uri: string = '';

if(process.env.NODE_ENV === NodeEnv.TEST){
    connection_uri = process.env.DATABASE_URL_TEST
}
else if(process.env.NODE_ENV === NodeEnv.PROD){
    connection_uri = process.env.DATABASE_URL_PROD
}
else{
    connection_uri = process.env.DATABASE_URL_TEST
}

const sequelize = new Sequelize(connection_uri || "", {
    logging: console.log,
})

export default sequelize