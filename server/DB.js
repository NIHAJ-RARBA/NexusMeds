import pkg from "pg";
const { Pool : POOL} = pkg;


// const pool = new POOL({
//     user: "postgres",
//     host: "localhost",
//     database: "nexusmeds",
//     password: "1234",
//     port: 5432,
// });

const pool = new POOL({
    user: "postgres",
    host: "localhost",
    database: "NexusMeds",
    password: "1234",
    port: 5432,
});


export default pool;