// src/middlewares/authenticate.ts

import { Request, Response, NextFunction } from 'express';
import { PassportServiceFactory, AuthStrategy } from '../services/passport/passport.service.factory';

/**
 * @function authenticate
 * @description Middleware to authenticate user using Passport and JWT strategy. This middleware function integrates
 * Passport.js for authentication purposes, specifically using the JWT strategy to verify and authenticate users.
 *
 * The middleware function creates an instance of the PassportService using the PassportServiceFactory, retrieves the
 * JWT authentication middleware, and applies it to the request, response, and next function. If an error occurs during
 * the authentication process, it handles the error by logging it and responding with a 401 Unauthorized status.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 */
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
 try {
  /**
   * Create a PassportService instance using the factory. The PassportServiceFactory is used to create an instance of
   * the PassportService with the necessary configuration and strategies.
   */
  const passportService = PassportServiceFactory.createPassportService(new StrategyFactory());

  /**
   * Get the JWT authentication middleware using AuthStrategy enum. The PassportService provides a method to retrieve
   * the authentication middleware for the specified strategy, which in this case is JWT.
   */
  const jwtAuthMiddleware = passportService.getAuthMiddleware(AuthStrategy.JWT);

  /**
   * Use the JWT authentication middleware. The retrieved middleware is applied to the request, response, and next
   * function to handle the authentication process.
   */
  jwtAuthMiddleware(req, res, next);
 } catch (error) {
  /**
   * Handle errors. If an error occurs during the authentication process, it is caught and handled by logging the error
   * and responding with a 401 Unauthorized status and a failure message.
   */
  console.error('Authentication error:', error);
  res.status(401).json({ message: 'Authentication failed' });
 }
};
