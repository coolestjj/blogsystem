import mysql from 'mysql';

export const db = mysql.createConnection({
    host: 'db4free.net',
    user: "ljjljj",
    password: "Cooljj666!",
    database: "ljjdatabase"
})