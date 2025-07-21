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
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-slate-900 shadow-2xl rounded-xl font-sans text-white border border-slate-700">
      <h2 className="text-3xl font-bold mb-6 text-center text-cyan-400">Student Form</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className="block font-semibold text-cyan-300 mb-1">Roll No:</label>
            <input
              type="text"
              name="roll"
              value={form.roll}
              onChange={handleChange}
              className="w-full border border-slate-600 rounded-lg p-3 bg-slate-800 text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block font-semibold text-cyan-300 mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-slate-600 rounded-lg p-3 bg-slate-800 text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block font-semibold text-cyan-300 mb-1">Course:</label>
            <select
              name="course"
              value={form.course}
              onChange={handleChange}
              className="w-full border border-slate-600 rounded-lg p-3 bg-slate-800 text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-200"
            >
              <option value="btech">BTech</option>
              <option value="mtech">MTech</option>
              <option value="msc">MSc</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold text-cyan-300 mb-1">Specialisation:</label>
            <select
              name="specialisation"
              value={form.specialisation}
              onChange={handleChange}
              className="w-full border border-slate-600 rounded-lg p-3 bg-slate-800 text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-200"
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
              <label className="block font-semibold text-cyan-300 mb-1">
                Subject {i + 1}:
              </label>
              <input
                type="text"
                value={val}
                placeholder={
                  isGradeMode ? "Enter grade  (A-F)" : "Enter marks (0–100)"
                }
                onChange={(e) => handleSubjectChange(i, e.target.value)}
                className="w-full border border-slate-600 rounded-lg p-3 bg-slate-800 text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-200"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex justify-center space-x-4">
        <button
          onClick={calculateSGPA}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg font-semibold"
        >
          Calculate
        </button>
        <button
          onClick={switchToGradeMode}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-all duration-200 shadow-lg font-semibold"
        >
          Grade Mode
        </button>
      </div>

      {/* Output */}
      {sgpa && (
        <div className="mt-8 text-center font-bold text-xl text-emerald-400">
          {sgpa}
        </div>
      )}
    </div>
  );
};

export default App;
