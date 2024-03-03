const express=require("express");
const app=express();
const cors=require('cors');
const pool=require("./db");



//middleware
app.use(cors());
app.use(express.json());

//Routes//

//create a todo
// app.post("/sushma",async(req,res)=>{
//     console.log(req.body);
//     try{
//         const {description}=req.body;
        
//         const newTodo=await pool.query("INSERT INTO Details (description) VALUES($1) RETURNING *",
//             [description]
//         );
//         res.json(newTodo.rows[0]);
//     }
//     catch(err){
//         console.error(err.message);
//     }
// })

//get all records
app.get("/sushma",async(req,res)=>{
    try{
        const allTodos=await pool.query("SELECT * FROM Details");
        res.status(200).json(allTodos.rows);
    }
    catch(err){
        console.error(err.message)
    }
})





app.listen(5000,()=>{
    console.log("server has started on pport 5000")
});