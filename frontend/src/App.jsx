import { useState } from 'react'
import './App.css'
import { StudentForm } from './components/StudentForm'
import { StudentList } from './components/StudentsList'

function App() {
  const [refStudent, setRefStudent] = useState(false);
  const [editStudent, setEditStudent] = useState(null);

  const studentData = () => {
    setRefStudent(!refStudent);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Student Management System</h1>
          <p className="text-gray-600 mt-2">Add, update and manage student records easily</p>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
            <StudentForm
              StudentData={studentData}
              editStudent={editStudent}
              setEditStudent={setEditStudent}
            />
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
            <StudentList
              refStudent={refStudent}
              setEditStudent={setEditStudent}
              studentData={studentData}
            />
          </div>
        </div>

      </div>
    </div>
  )
}

export default App