import { useState } from "react";
import { deleteStudent, getStudent } from "../api/api";
import { useEffect } from "react";

export const StudentList = ({ refresh, setEditStudent, studentData }) => {
  const [student, setStudent] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [params, setParams] = useState({
    search: "",
    sortBy: "",
    order: "asc",
    page: 1,
    limit: 5,
  });

  const fetchStudent = async () => {
    try {
      const res = await getStudent(params);
      setStudent(res.data || res.students || []);
      setTotalPage(res.pagination?.totalPage || 1);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [params, refresh]);

  const handleDelete = (id) => {
    deleteStudent(id)
      .then((deleteStudentApi) => {
        if (deleteStudentApi.status) {
          alert(deleteStudentApi.data.message || deleteStudentApi.status);
        } else {
          alert(deleteStudentApi.message);
        }
        studentData();
      })
      .catch((error) => {
        console.log(error);
        alert(error.response?.data?.message || "Student delete Failed");
      });
  };

  return (
    <div className="w-full px-4 py-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">
          Student Data
        </h1>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-10">
          <input
            type="text"
            placeholder="Enter Either name or Course"
            onChange={(e) => {
              setParams({ ...params, search: e.target.value, page: 1 });
            }}
            className="w-full md:w-72 border border-gray-300 rounded-lg px-4 py-2 bg-white outline-none focus:border-blue-500"
          />

          <select
            onChange={(e) => {
              setParams({ ...params, sortBy: e.target.value });
            }}
            className="w-full md:w-52 border border-gray-300 rounded-lg px-4 py-2 bg-white outline-none focus:border-blue-500"
          >
            <option value="">Data SortBy</option>
            <option value="name">SortBy Name</option>
            <option value="fees">SortBy Fees</option>
            <option value="age">SortBy Age</option>
          </select>

          <select
            onChange={(e) => {
              setParams({ ...params, order: e.target.value });
            }}
            className="w-full md:w-40 border border-gray-300 rounded-lg px-4 py-2 bg-white outline-none focus:border-blue-500"
          >
            <option value="">Order</option>
            <option value="asc">Asc</option>
            <option value="desc">DESC</option>
          </select>
        </div>

        {/* Student Cards */}
       <div className="flex flex-wrap gap-6 justify-center">
  {student.map((std) => (
    <div
      key={std._id}
      className="w-full sm:w-[320px] bg-white border border-gray-200 rounded-2xl p-5 shadow-md hover:shadow-xl transition duration-300"
    >
      {/* Top small line (premium feel but simple) */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded mb-3"></div>

      <p className="text-gray-700 mb-2">
        <span className="font-semibold text-gray-800">Name:</span>{" "}
        {std.name}
      </p>

      <p className="text-gray-700 mb-2">
        <span className="font-semibold text-gray-800">Course:</span>{" "}
        {std.course}
      </p>

      <p className="text-gray-700 mb-2">
        <span className="font-semibold text-gray-800">Email:</span>{" "}
        {std.email}
      </p>

      <p className="text-gray-700 mb-2">
        <span className="font-semibold text-gray-800">Age:</span>{" "}
        {std.age}
      </p>

      <p className="text-gray-700 mb-4">
        <span className="font-semibold text-gray-800">Fees:</span>{" "}
        ₹{std.fees}
      </p>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setEditStudent(std)}
          className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 transition"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => handleDelete(std._id)}
          className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            disabled={params.page === 1}
            onClick={() => setParams({ ...params, page: params.page - 1 })}
            className={`px-4 py-2 rounded-lg font-medium transition 
              ${
                params.page === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
          >
            Prev
          </button>

          <p className="bg-blue-500 text-white px-5 py-2 rounded-lg text-sm font-semibold">
            Page {params.page} / {totalPage}
          </p>

          <button
            disabled={params.page === totalPage}
            onClick={() => setParams({ ...params, page: params.page + 1 })}
            className={`px-4 py-2 rounded-lg font-medium transition 
              ${
                params.page === totalPage
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};