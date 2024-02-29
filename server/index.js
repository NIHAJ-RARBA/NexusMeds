import express from "express";
const app = express();
import cors from "cors";

import multer from 'multer';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyACUnsi5MHC4NZyh9in2LPQxsCMZyW_Tw8",
    authDomain: "nexusmeds-53708.firebaseapp.com",
    projectId: "nexusmeds-53708",
    storageBucket: "nexusmeds-53708.appspot.com",
    messagingSenderId: "1050596976120",
    appId: "1:1050596976120:web:e1606b793e02155870a20d",
    measurementId: "G-EJBDL66364"
};

const firebase = initializeApp(firebaseConfig);
const storage = getStorage(firebase);

const upload = multer({storage: multer.memoryStorage()});


// routers

import medicineRouter from "./Routers/medicineRouter.js";
import customerRouter from "./Routers/customerRouter.js";
import chemicalRouter from "./Routers/chemicalRouter.js";
import researcherRouter from "./Routers/researcherRouter.js";
import jwtAuthRouter from "./Routers/jwtAuthRouter.js";
import router from "./Routers/adminRouter.js";
import searchRouter from "./Routers/searchRouter.js";
import cartRouter from "./Routers/cartRouter.js";
import orderRouter from "./Routers/orderRouter.js";
import manufacturerRouter from "./Routers/manufacturerRouter.js";
import inventoryRouter from "./Routers/inventoryRouter.js";




// middleware
app.use(cors());
app.use(express.json());

app.use('/auth', jwtAuthRouter);
app.use('/admin', router);
app.use('/medicine', medicineRouter);
app.use('/customer', customerRouter); // "customer/" is for dashboard
app.use('/chemical', chemicalRouter);
app.use('/researcher', researcherRouter);
app.use('/search', searchRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);
app.use('/manufacturer', manufacturerRouter);
app.use('/inventory', inventoryRouter);


app.get('/fileUpload', (req, res) => {
    res.send('FIREBASE UPLOAD');
});


app.post("/permitUpload", upload.single("permit"), async (req, res) => {
    try {
      // Get the file from req.file
      const file = req.file;
  
      // Upload the file to Firebase Storage
      const storageRef = ref(storage, `photos/${file.originalname}`);
      const snapshot = await uploadBytes(storageRef, file.buffer);
    //   console.log("Uploaded", snapshot.totalBytes, "bytes");
      console.log("File metadata:", snapshot.metadata);
  
      // Get the download URL for the uploaded file
      const downloadURL = await getDownloadURL(storageRef);
  
      // Return the download URL in the response
      console.log("File available at", downloadURL);
      res.json({ downloadURL });
    } catch (error) {
      console.error("Upload failed", error);
      res.status(500).json({ error: "Upload failed" });
    }
  });
  
  



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