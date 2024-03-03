const Pool=require("pg").Pool;

const pool=new Pool({
    user:"postgres",
    password:"sushma90",
    host:"localhost",
    port:5432,
    database:"customer"
});
module.exports=pool; 