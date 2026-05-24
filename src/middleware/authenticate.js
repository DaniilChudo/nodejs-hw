import createError from 'http-errors';
import { Session } from '../models/session.js';
import { User } from '../models/user.js';

export const authenticate = async (req, res, next) => {
  try {
    const { accessToken, sessionId } = req.cookies;

    if (!accessToken || !sessionId) {
      return next(createError(401, 'Missing access token or session ID'));
    }

    const session = await Session.findOne({ _id: sessionId, accessToken });
    if (!session) {
      return next(createError(401, 'Session not found'));
    }

    const isTokenExpired = new Date() > new Date(session.accessTokenValidUntil);
    if (isTokenExpired) {
      return next(createError(401, 'Access token expired'));
    }

    const user = await User.findById(session.userId);
    if (!user) {
      return next(createError(401));
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
