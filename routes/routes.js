const express = require('express');
const {
  createToken
} = require('../controller/tokenController');
const verifyToken = require('../Middleware/verifyJwt.js');
const {
  addUser,
  getAllUsers,
  updateRole,
  allInstructors,
  getPopularInstructor
} = require('../controller/userController/userController');
const {
  getAllClasses,adminClasses,
  addClasses,
  getInstructorClasses,
  updateInstructorClasses,
  deleteInstructorClasses,
  sendFeedback,
  updateStatus,
  singleInstructorClasses,
  getPopularClasses
} = require('../controller/classesController/classesController');
const verifyRole = require('../Middleware/verifyRole');
const {
  selectedClassSave,
  getStudentSelectedClasses,
  deleteSelectedClass
} = require('../controller/StudentController/selectedClass');
const {
  paymentController,
  paymentSuccessful
} = require('../controller/paymentController/paymentController');
const {
  getEnrolledClasses
} = require('../controller/StudentController/enrolledClass');

const router = express.Router();

// ! Delete it later
router.get('/', (req, res) => {
  res.send('Hello World!');
}
);


// Public routes
router.route('/classes').get(getAllClasses)
router.route('/allinstructors').get(allInstructors)
router.route('/singleInstructor').get(singleInstructorClasses)
router.route('/popularclass').get(getPopularClasses)
router.route('/popularinstructor').get(getPopularInstructor)


// Users routes
router.route('/users').get(verifyToken, verifyRole('admin'), getAllUsers).post(addUser)

router.route('/admin/users/:id').put(verifyToken, verifyRole('admin'), updateRole)


router.route('/myClasses')
.get(verifyToken, verifyRole('instructor'), getInstructorClasses)
.post(verifyToken, verifyRole('instructor'), addClasses)
.put(verifyToken, verifyRole('instructor'), updateInstructorClasses)

router.route('/myClasses/:classId').delete(verifyToken, verifyRole('instructor'), deleteInstructorClasses)

// admin change class info
router.route('/admin/classes/:id')
.put(verifyToken, verifyRole('admin'), sendFeedback)
.patch(verifyToken, verifyRole('admin'), updateStatus)

router.route('/admin/classes')
.get(verifyToken, verifyRole('admin'), adminClasses)
// student routes
router.route('/students')
.get(verifyToken, verifyRole('student'), getStudentSelectedClasses)
.post(verifyToken, verifyRole('student'), selectedClassSave)
.delete(verifyToken, verifyRole('student'), deleteSelectedClass)

router.route('/enrolledclasses')
.get(verifyToken, verifyRole('student'), getEnrolledClasses)
// create jwt
router.route('/token').post(createToken)

// payment routes
router.route('/payment').post(verifyToken, verifyRole('student'), paymentController)
router.route('/paymentsuccessful').post(verifyToken, verifyRole('student'), paymentSuccessful)

module.exports = router;