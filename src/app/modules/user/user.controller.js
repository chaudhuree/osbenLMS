const catchAsync = require('../../utils/catchAsync');
const sendResponse = require('../../utils/sendResponse');




const userService = require('./user.service');

const createUser = catchAsync(async (req, res) => {
  const result = await userService.createUser(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await userService.loginUser(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const { 
    page = 1, 
    limit = 10, 
    sortBy = 'createdAt', 
    sortOrder = 'desc',
    searchTerm = '' 
  } = req.query;

  const result = await userService.getAllUsers(
    page,
    limit,
    sortBy,
    sortOrder,
    searchTerm
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Users retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userService.getUser(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userService.updateUser(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  // delete user
  const result = await userService.deleteUser(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});

const forgotPassword = catchAsync(async (req, res) => {
  const result = await userService.forgotPassword(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password reset email sent successfully',
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const { email, newPassword, resetToken } = req.body;
  const result = await userService.resetPassword(email, newPassword, resetToken);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password reset successfully',
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { id } = req.user;
  const result = await userService.changePassword(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password changed successfully',
    data: result,
  });
});

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  forgotPassword,
  resetPassword,
  changePassword,
};
