// src/middlewares/authenticate.ts

import { Request, Response, NextFunction } from 'express';
import { PassportServiceFactory, AuthStrategy } from '../services/passport/passport.service.factory';

/**
 * Middleware to authenticate user using Passport and JWT strategy.
 */
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Create a PassportService instance using the factory
    const passportService = PassportServiceFactory.createPassportService(new StrategyFactory());

    // Get the JWT authentication middleware using AuthStrategy enum
    const jwtAuthMiddleware = passportService.getAuthMiddleware(AuthStrategy.JWT);

    // Use the JWT authentication middleware
    jwtAuthMiddleware(req, res, next);
  } catch (error) {
    // Handle errors
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Authentication failed' });
  }
};
