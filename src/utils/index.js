export const generateSuccessResponse = (message, data) => {
  return {
    success: true,
    message,
    data
  }
}

export const generateErrorResponse = (message, error) => {
  return {
    success: false,
    message,
    error
  }
}
