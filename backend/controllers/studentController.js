import { Student } from "../models/studentModel.js";


// createStudent 
export const createStudent = async (req, res) => {
    try {
        const { name, email, age, course, fees, status } = req.body;

        //   All feilds require 
        if (!name || !email || !age || !course || !fees) {
            return res.status(400).json({
                status: false,
                message: "All feilds are required"
            })
        }
        // email check 
        const checkEmail = await Student.findOne({ email });
        if (checkEmail) {
            res.json({
                status: false,
                message: "Email already Exist"
            })
        }




        const student = await Student.create({
            name,
            email,
            age,
            course,
            fees,
            status: status ? status : "active"
        })

        await student.save()

        return res.status(201).json({
            status: true,
            message: "Student created",
            data: student
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: `Error in creating student ${error.message}`
        })
    }
}

// bulkuploadstudent 

export const bulkUploadStudent = async (req, res) => {
    try {
        const student = req.body;
        if (!Array.isArray(student)) {
            return res.status(400).json({
                status: false,
                message: "Invalid Data and Not an Array"
            })
        }

        const result = await Student.insertMany(student)

        return res.status(201).json({
            status: true,
            message: "Student got Inserted",
            data: result
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: `Error in inserting student ${error.message}`
        })
    }
}


// getAllStudent 

export const getAllStudent = async (req, res) => {
    try {
        let { search, sortBy, order, page, limit } = req.query;

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 5;

        if (page < 1) page = 1;
        if (limit < 1) limit = 5;
        if (limit > 50) limit = 50;

        let query = {};

        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { course: { $regex: search, $options: "i" } }
                ]
            }
        }
        let sortOption = {};

        if (sortBy) {
            sortOption[sortBy] = order === "desc" ? -1 : 1;

        }

        const skip = (page - 1) * limit;

        const students = await Student.find(query)
            .skip(skip)
            .sort(sortOption)
            .limit(limit)

        const total = await Student.countDocuments(query);
        return res.json({
            status: true,
            message: "Student Get",
            data: students,
            pagination: {
                total,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                perPage: limit
            }
        })
    } catch (error) {
        return res.json({
            status: false,
            message: `Error in getAll student ${error.message}`
        })
    }
}


// updateStudent

export const updateStudent = async (req, res) => {
    try {
        let { id } = req.params;
        const { name, email, age, course, fees } = req.body;
        if (!name || !email || !age || !course || !fees) {
            return res.status(400).json({
                status: false,
                message: "All feilds are required"
            })
        }

        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({
                status: false,
                message: "Student not Found"
            })
        }

        const updateStudent = await Student.findByIdAndUpdate(id, req.body, {
            new: true
        })

        return res.status(201).json({
            status: true,
            message: "Student Updated Successfully",
            data: updateStudent
        })

    } catch (error) {
        res.status(500).json({
            status: false,
            message: `Error in updateStudent ${error.message}`,
        });
    }
}


// updateStudentPartially

export const updateStudentPartially = async(req,res)=>{
    try {
        const {id} = req.params;
        const { name, email, age, course, fees } = req.body;

        const student = await Student.findById(id);

        if(!student){
         return res.status(404).json({
            status: false,
                message: "Student not Found"
         })
        }
        const updateStudent = await Student.findByIdAndUpdate(id,req.body,{
            new: true
        })

        return res.status(201).json({
            status: true,
            message: "Student Updated Successfully",
            data: updateStudent
        })
        
    } catch (error) {
         res.status(500).json({
            status: false,
            message: `Error in updateStudent ${error.message}`,
        });
    }
}

// deleteStudent

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        status: false,
        message: "Student not Exist",
      });
    }

    const deletedStudent = await Student.findByIdAndDelete(id);

    return res.status(200).json({
      status: true,
      message: "Student Deleted",
      data: deletedStudent,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: `Error found in DeleteAPI ${error.message}`,
    });
  }
};