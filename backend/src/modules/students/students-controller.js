const asyncHandler = require('express-async-handler');
const {
  getAllStudents,
  addNewStudent,
  getStudentDetail,
  setStudentStatus,
  updateStudent
} = require('./students-service');

const handleGetAllStudents = asyncHandler(async (req, res) => {
  console.log('Query parameters received in handleGetAllStudents:', req.query);
  const students = await getAllStudents(req.query);
  res.status(200).json({ data: students });
});

const handleAddStudent = asyncHandler(async (req, res) => {
  const studentData = req.body;
  if (!studentData || !studentData.name) {
    res.status(400);
    throw new Error('Missing required student data.');
  }
  const student = await addNewStudent(studentData);
  res.status(201).json({ message: 'Student added successfully', data: student });
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  if (!id || !updates) {
    res.status(400);
    throw new Error('Missing student ID or update data.');
  }
  const updatedStudent = await updateStudent(id, updates);
  res.status(200).json({ message: 'Student updated successfully', data: updatedStudent });
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error('Missing student ID.');
  }
  const student = await getStudentDetail(id);
  if (!student) {
    res.status(404);
    throw new Error('Student not found.');
  }
  res.status(200).json({ data: student });
});

const handleStudentStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { is_active } = req.body;
  if (typeof is_active !== 'boolean') {
    res.status(400);
    throw new Error("Missing or invalid 'is_active' status.");
  }
  const result = await setStudentStatus(id, is_active);
  res.status(200).json({ message: 'Student status updated', data: result });
});

module.exports = {
  handleGetAllStudents,
  handleGetStudentDetail,
  handleAddStudent,
  handleStudentStatus,
  handleUpdateStudent
};
