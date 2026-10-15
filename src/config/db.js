import 'dotenv/config';
import mysql from 'mysql2/promise';


const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST ,
  DB_PORT ,

} = process.env;

const dbConfig = {
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,

};
  
const con = mysql.createPool(dbConfig);

(async () => {
  try {
    const connection = await con.getConnection();
    console.log('Database connected successfully!');
    connection.release(); // Release the connection back to the pool
  } catch (error) {
    console.error('Database connection failed:', error.message);
  }
})();

export default con;
