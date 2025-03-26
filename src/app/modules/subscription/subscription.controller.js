const catchAsync = require('../../utils/catchAsync');
const sendResponse  = require('../../utils/sendResponse');
const subscriptionService = require('./subscription.service');

const createCustomer = catchAsync(async (req, res) => {
  const customerId = await subscriptionService.createCustomer(req.user.id);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Stripe customer created successfully',
    data: { customerId },
  });
});

const attachPaymentMethod = catchAsync(async (req, res) => {
  const { paymentMethodId } = req.body;
  await subscriptionService.attachPaymentMethod(req.user.id, paymentMethodId);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Payment method attached successfully',
  });
});

const createSubscription = catchAsync(async (req, res) => {
  const { priceId, paymentMethodId } = req.body;
  const result = await subscriptionService.createSubscription(
    req.user.id,
    priceId,
    paymentMethodId
  );
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Subscription created successfully',
    data: result,
  });
});

const cancelSubscription = catchAsync(async (req, res) => {
  await subscriptionService.cancelSubscription(req.user.id);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Subscription cancelled successfully',
  });
});

const getSubscriptionStatus = catchAsync(async (req, res) => {
  const isActive = await subscriptionService.checkSubscriptionStatus(req.user.id);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Subscription status retrieved successfully',
    data: { isActive },
  });
});

module.exports = {
  createCustomer,
  attachPaymentMethod,
  createSubscription,
  cancelSubscription,
  getSubscriptionStatus,
}; 