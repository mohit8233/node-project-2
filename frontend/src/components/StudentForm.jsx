import { useEffect } from "react"
import { useState } from "react"
import { createStudent, updateStudent } from "../api/api";

export const StudentForm = ({ StudentData, editStudent, setEditStudent }) => {
    const [obj, setObj] = useState({
        name: "",
        email: "",
        age: "",
        course: "",
        fees: ""
    })

    useEffect(() => {
        if (editStudent) {
            setObj({
                name: editStudent.name || "",
                email: editStudent.email || "",
                age: editStudent.age || "",
                course: editStudent.course || "",
                fees: editStudent.fees || ""
            })
        } 
    }, [editStudent]);

    const handleChange = (e) => {
        const { name, value } = e.target

        setObj({
            ...obj,
            [name]: name === "age" || name === "fees"
                ? value === "" ? "" : Number(value)
                : value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editStudent) {
            updateStudent(editStudent._id, obj)
                .then((updateStudentApi) => {
                    if (updateStudentApi.status) {
                        alert(updateStudentApi.data.message || updateStudentApi.status)
                    } else {
                        alert(updateStudentApi.message)
                    }

                    setObj({
                        name: "",
                        email: "",
                        age: "",
                        course: "",
                        fees: ""
                    })
                    setEditStudent(null);
                    StudentData()
                })
                .catch((error) => {
                    console.log(error);
                    alert(error.response?.data?.message || "Update failed");
                });
        } else {
            createStudent(obj)
                .then((createStudentApi) => {
                    if (createStudentApi.status) {
                        alert(createStudentApi.data.message || createStudentApi.status)
                    } else {
                        alert(createStudentApi.message)
                    }

                    setObj({
                        name: "",
                        email: "",
                        age: "",
                        course: "",
                        fees: ""
                    })
                    StudentData();
                })
                .catch((error) => {
                    console.log(error);
                    alert(error.response?.data?.message || "Create failed");
                });
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
                
                <div className={`${editStudent ? "bg-yellow-500" : "bg-blue-600"} px-6 py-5`}>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                        {editStudent ? "Update Student Details" : "Add New Student"}
                    </h2>
                    <p className="text-white/90 text-sm mt-1">
                        {editStudent
                            ? "Edit the student information and save changes."
                            : "Fill all student details to create a new record."
                        }
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={obj.name}
                                placeholder="Enter student name"
                                onChange={handleChange}
                                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={obj.email}
                                placeholder="Enter email address"
                                onChange={handleChange}
                                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">
                                Age
                            </label>
                            <input
                                type="number"
                                name="age"
                                value={obj.age}
                                placeholder="Enter age"
                                onChange={handleChange}
                                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">
                                Course
                            </label>
                            <input
                                type="text"
                                name="course"
                                value={obj.course}
                                placeholder="Enter course name"
                                onChange={handleChange}
                                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            />
                        </div>

                        <div className="flex flex-col md:col-span-2">
                            <label className="text-sm font-semibold text-gray-700 mb-2">
                                Fees
                            </label>
                            <input
                                type="number"
                                name="fees"
                                value={obj.fees}
                                placeholder="Enter fees amount"
                                onChange={handleChange}
                                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        <button
                            type="submit"
                            className={`flex-1 text-white py-3.5 rounded-xl font-semibold shadow-md transition duration-300 ${editStudent
                                    ? "bg-yellow-500 hover:bg-yellow-600"
                                    : "bg-blue-600 hover:bg-blue-700"
                                }`}
                        >
                            {editStudent ? "Update Student" : "Add Student"}
                        </button>

                        {editStudent && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditStudent(null)
                                    setObj({
                                        name: "",
                                        email: "",
                                        age: "",
                                        course: "",
                                        fees: ""
                                    })
                                }}
                                className="flex-1 bg-gray-100 text-gray-700 py-3.5 rounded-xl font-semibold border border-gray-300 hover:bg-gray-200 transition duration-300"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}