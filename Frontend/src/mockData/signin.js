export const signInMockData = {
  data: {
    message: "Login successful.",
    details: {
      email: "shevin12@gmail.com",
      isBusOwner: false,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJhMTdjMjEzNjExNjNlYzYwZTdiZDkiLCJlbWFpbCI6InNoZXZpbjEyQGdtYWlsLmNvbSIsImlzQnVzT3duZXIiOmZhbHNlLCJpYXQiOjE2OTcyNTc1MDQsImV4cCI6MTY5OTg0OTUwNH0.CKQGay4DiD083Kb1yFq0JyJCVN3r6IqsWhNGUacs1WE",
    },
  },
  status: 200,
};
export const signInUserNotFoundMockData = {
  data: {
    success: false,
    status: 404,
    message: "Incorrect username or password.",
    stack:
      "Error: User not found.\n    at login (I:\\TEST CODE\\InstaCart-main\\Backend\\controllers\\userController.js:68:21)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)",
  },
  status: 404,
};
export const signInIncorrectCredentialsMockData = {
  data: {
    success: false,
    status: 400,
    message: "Incorrect username or password.",
    stack:
      "Error: Incorrect username or password.\n    at login (I:\\TEST CODE\\InstaCart-main\\Backend\\controllers\\userController.js:74:21)",
  },
};
