import { createPool } from "mysql2/promise";
import {
    DB_HOST,
    DB_DATABASE,
    DB_PORT,
    DB_PASSWORD,
    DB_USER
} from './config.js';

export const databaseConn = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_DATABASE
};

export const pool = createPool(databaseConn);