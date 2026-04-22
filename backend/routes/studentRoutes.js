import { Router } from "express";
import { bulkUploadStudent, createStudent, deleteStudent, getAllStudent, updateStudent, updateStudentPartially } from "../controllers/studentController.js";


export const studentRouter = Router();

studentRouter.post("/create", createStudent);
studentRouter.post("/bulkUpload", bulkUploadStudent);
studentRouter.get("/getStudent", getAllStudent);
studentRouter.put("/updateFull/:id",updateStudent);
studentRouter.patch("/updateStudent/:id", updateStudentPartially);
studentRouter.delete("/deleteStudent/:id", deleteStudent);
