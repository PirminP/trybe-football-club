import { ErrorRequestHandler } from 'express';

const errorMsg = [
  { messsage: 'All fields must be filled', code: 400 },
  { messsage: 'Incorrect email or password', code: 401 },
];

const handlingError: ErrorRequestHandler = (error, req, res, _next) => {
  const { message } = error;
  const messageValidation = errorMsg.find((msg) => msg.messsage === message);
  if (messageValidation) {
    return res.status(messageValidation.code).json({ message: messageValidation.messsage });
  }
  return res.status(500).json('Internal server error');
};

export default handlingError;
