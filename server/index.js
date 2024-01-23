import express from "express";
const app = express();
import cors from "cors";


// routers

import medicineRouter from "./Routers/medicineRouter.js";
import customerRouter from "./Routers/customerRouter.js";
import chemicalRouter from "./Routers/chemicalRouter.js";
import researcherRouter from "./Routers/researcherRouter.js";
import jwtAuthRouter from "./Routers/jwtAuthRouter.js";
import router from "./Routers/adminRouter.js";




// middleware
app.use(cors());
app.use(express.json());

app.use('/auth', jwtAuthRouter);
app.use('/admin', router);
app.use('/medicine', medicineRouter);
app.use('/customer', customerRouter); // "customer/" is for dashboard
app.use('/chemical', chemicalRouter);
app.use('/researcher', researcherRouter);// "researcher/" is for dashboard


// create a task


// app.post("/users", async (req, res) => {
//     try {
//       const { email, phone, fullname, date_of_birth, gender, _address } = req.body;
//       const newUser = await pool.query(
//         "INSERT INTO person (email, phone, fullname, date_of_birth, gender, _address) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
//         [email, phone, fullname, date_of_birth, gender, _address]
//       );
  
//       res.json(newUser.rows[0]);
//       console.log(req.body);
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Internal Server Error");
//     }
//   });
  


// // update a task

// app.put("/users/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { email, phone, fullname, date_of_birth, gender, _address } = req.body;
//         const updateUser = await pool.query(
//             "UPDATE person SET email = $1, phone = $2, fullname = $3, date_of_birth = $4, gender = $5, _address = $6 WHERE person_id = $7 RETURNING *",
//             [email, phone, fullname, date_of_birth, gender, _address, id]
//         );

//         res.json({ message: "User was updated", user: updateUser.rows[0] });
//     } catch (error) {
//         console.log(error.message);
//     }
// });

// // delete a task

// app.delete("/users/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deleteUser = await pool.query("DELETE FROM person WHERE person_id = $1", [id]);

//         res.json({ message: "User was deleted" });
//     } catch (error) {
//         console.log(error.message);
//     }
// });

// // get all tasks

// app.get("/users", async(req, res) => {
//     try {
//         const allTasks = await pool.query("SELECT * FROM person");
//         res.json(allTasks.rows);
//         console.log(allTasks.rows);
//     } catch (error) {
//         console.log(error.message);
//     }
// });


// // get a task

// app.get("/users/:id", async(req, res) => {
//     try {
//         const {id} = req.params;
//         const { email, phone, fullname, date_of_birth, gender, _address } = req.body;
//         const newUser = await pool.query(
//             "SELECT * FROM person WHERE person_id = ($1)",
//              [id]
//              );
        
//         res.json(newUser.rows[0]); 
//         console.log(newUser.rows[0]);
//         console.log(req.params);

//     } catch (error) {
//         console.log(error.message);
//         console.log(error.params);
//     }
// })



app.listen(5000, () =>{
    console.log("server is running on port 5000");
})