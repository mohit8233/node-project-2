import { useState } from "react";
import { deleteStudent, getStudent } from "../api/api";
import { useEffect } from "react";

export const StudentList = ({ refresh, setEditStudent, refreshData }) => {
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
      setTotalPage(res.pagination?.totalPages || 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [params, refresh]);

const handleDelete = (id) => {
  deleteStudent(id)
    .then((deleteStudentApi) => {
      console.log("delete response:", deleteStudentApi);

      if (deleteStudentApi.data.status) {
        alert(deleteStudentApi.data.message || deleteStudentApi.status);
        refreshData();
      } else {
        alert(deleteStudentApi.data.message);
      }
    })
    .catch((error) => {
      console.log("delete error:", error);
      alert(error.response?.data?.message || error.message || "Student delete Failed");
    });
};

  return (
    <div className="w-full px-4 py-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">
          Student Data
        </h1>

        
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

        
      
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
  {student.length > 0 ? (
    student.map((std) => (
      <div
        key={std._id}
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
      >
        <div className="p-5 space-y-3">
          <p className="flex items-center justify-between border-b border-slate-100 pb-2 text-sm">
            <span className="font-semibold text-slate-600">Name</span>
            <span className="text-slate-800">{std.name}</span>
          </p>

          <p className="flex items-center justify-between border-b border-slate-100 pb-2 text-sm">
            <span className="font-semibold text-slate-600">Course</span>
            <span className="text-slate-800">{std.course}</span>
          </p>

          <p className="flex items-center justify-between border-b border-slate-100 pb-2 text-sm">
            <span className="font-semibold text-slate-600">Email</span>
            <span className="text-slate-800">{std.email}</span>
          </p>

          <p className="flex items-center justify-between border-b border-slate-100 pb-2 text-sm">
            <span className="font-semibold text-slate-600">Age</span>
            <span className="text-slate-800">{std.age}</span>
          </p>

          <p className="flex items-center justify-between text-sm">
            <span className="font-semibold text-slate-600">Fees</span>
            <span className="rounded-full bg-green-100 px-3 py-1 font-semibold text-green-700">
              ₹{std.fees}
            </span>
          </p>

          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={() => setEditStudent(std)}
              className="flex-1 rounded-xl bg-amber-500 px-4 py-2.5 font-semibold text-white shadow hover:bg-amber-600 transition"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() => handleDelete(std._id)}
              className="flex-1 rounded-xl bg-red-500 px-4 py-2.5 font-semibold text-white shadow hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="col-span-full rounded-2xl bg-white p-10 text-center text-slate-500 shadow-md">
      No students found
    </div>
  )}
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