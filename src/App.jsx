import React, { useState } from "react";

const App = () => {
  const initialState = {
    roll: "",
    name: "",
    course: "btech",
    specialisation: "cse",
    subjects: ["", "", "", "", ""],
  };

  const [form, setForm] = useState(initialState);
  const [isGradeMode, setIsGradeMode] = useState(false);
  const [sgpa, setSgpa] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubjectChange = (i, value) => {
    const newSubjects = [...form.subjects];
    newSubjects[i] = value;
    setForm((prev) => ({ ...prev, subjects: newSubjects }));
  };

  const calculateSGPA = () => {
    if (isGradeMode) {
      const gradeMap = { A: 10, B: 8, C: 6, D: 4, E: 2, F: 0 };
      const gradePoints = form.subjects.map((g) => gradeMap[g.toUpperCase()] ?? null);
      if (gradePoints.includes(null)) {
        setSgpa("Invalid grade input");
        return;
      }
      const avg = gradePoints.reduce((a, b) => a + b, 0) / gradePoints.length;
      setSgpa(`SGPA (Grade Mode): ${avg.toFixed(2)}`);
    } else {
      const marks = form.subjects.map(Number);
      if (marks.some((m) => isNaN(m) || m < 0 || m > 100)) {
        setSgpa("Invalid marks input");
        return;
      }
      const avg = marks.reduce((a, b) => a + b, 0) / marks.length;
      setSgpa(`SGPA (Marks Mode): ${avg.toFixed(2)}`);
    }
  };

  const switchToGradeMode = () => {
    setIsGradeMode(true);
    setForm((prev) => ({ ...prev, subjects: ["", "", "", "", ""] }));
    setSgpa(null);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-900 shadow-xl rounded-xl font-sans text-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Student Form</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-200">Roll No:</label>
            <input
              type="text"
              name="roll"
              value={form.roll}
              onChange={handleChange}
              className="w-full border border-gray-600 rounded p-2 bg-gray-800 text-white focus:border-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-200">Name:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-600 rounded p-2 bg-gray-800 text-white focus:border-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-200">Course:</label>
            <select
              name="course"
              value={form.course}
              onChange={handleChange}
              className="w-full border border-gray-600 rounded p-2 bg-gray-800 text-white focus:border-blue-400 focus:outline-none"
            >
              <option value="btech">BTech</option>
              <option value="mtech">MTech</option>
              <option value="msc">MSc</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold text-gray-200">Specialisation:</label>
            <select
              name="specialisation"
              value={form.specialisation}
              onChange={handleChange}
              className="w-full border border-gray-600 rounded p-2 bg-gray-800 text-white focus:border-blue-400 focus:outline-none"
            >
              <option value="cse">CSE</option>
              <option value="data sci">Data Sci</option>
              <option value="ai">AI</option>
            </select>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {form.subjects.map((val, i) => (
            <div key={i}>
              <label className="block font-semibold text-gray-200">
                Subject {i + 1}:
              </label>
              <input
                type="text"
                value={val}
                placeholder={
                  isGradeMode ? "Enter grade  (A-F)" : "Enter marks (0–100)"
                }
                onChange={(e) => handleSubjectChange(i, e.target.value)}
                className="w-full border border-gray-600 rounded p-2 bg-gray-800 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={calculateSGPA}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
        >
          Calculate
        </button>
        <button
          onClick={switchToGradeMode}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-200"
        >
          Grade
        </button>
      </div>

      {/* Output */}
      {sgpa && (
        <div className="mt-6 text-center font-semibold text-lg text-green-400">
          {sgpa}
        </div>
      )}
    </div>
  );
};

export default App;
