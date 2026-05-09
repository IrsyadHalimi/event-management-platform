export const successResponse = (
  res: any,
  message: string,
  data: any = null,
  meta: any = null,
  statusCode = 200
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    meta
  });
};

export const errorResponse = (
  res: any,
  message: string,
  statusCode = 500
) => {
  return res.status(statusCode).json({
    success: false,
    message
  });
};