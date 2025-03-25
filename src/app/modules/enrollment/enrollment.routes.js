const express = require('express');
const auth = require('../../middlewares/auth');
const enrollmentController = require('./enrollment.controller');
const router = express.Router();

// Student routes
router.use(auth('USER'));

// Enrollment routes
router.post('/courses/:courseId/enroll', enrollmentController.enrollInCourse);
router.patch('/courses/:courseId/complete', enrollmentController.completeEnrollment);

// Get enrollments with optional group/subgroup filtering
router.get('/my-enrollments', enrollmentController.getMyEnrollments);
router.get('/my-certificates', enrollmentController.getMyCertificates);

// Group specific routes
router.get('/my-enrollments/by-group/:groupId', enrollmentController.getMyEnrollments);
router.get('/my-enrollments/by-subgroup/:subGroupId', enrollmentController.getMyEnrollments);

// Provider/Admin routes
router.get(
  '/courses/:courseId/enrollments',
  auth('ADMIN', 'PROVIDER'),
  enrollmentController.getCourseEnrollments
);

module.exports = router; 