import { Router } from "express";
import { bulkUploadStudent, createStudent, deleteStudent, getAllStudent, updateStudent, updateStudentPartially } from "../controllers/studentController.js";


export const studentRouter = Router();

studentRouter.post("/create", createStudent);
studentRouter.post("/bulkUpload", bulkUploadStudent);
studentRouter.get("/getStudent", getAllStudent);
studentRouter.patch("/updateStudent/:id", updateStudentPartially);
studentRouter.delete("/delete/:id", deleteStudent);
