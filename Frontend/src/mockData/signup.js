export const signUpMockData = {
  data: {
    message: "User registered successfully.",
    details: {
      email: "shevin1288@gmail.com",
      isBusOwner: true,
    },
  },
  status: 200,
};
export const signUpUserAlreadyExistsMockData = {
  data: {
    success: false,
    status: 400,
    message: "User already exists.",
    stack:
      "Error: User already exists.\n    at register (I:\\TEST CODE\\InstaCart-main\\Backend\\controllers\\userController.js:39:21)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)",
  },
  status: 404,
};
