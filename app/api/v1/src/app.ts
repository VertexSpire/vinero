// src/AuthApp.ts

import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { User } from './models/User';
import authRoutes from './routes/AuthRoutes';
import { AuthService } from './services/AuthService';
import { PassportService } from './services/PassportService';
import { ServiceFactory } from './factories/ServiceFactory';

/**
 * @class AuthApp
 * @description Main application class for handling authentication-related operations. This class sets up and configures the Express application,
 * including middleware, routes, and Passport for authentication.
 */
export class AuthApp {
  /**
   * @property {express.Application} app - The Express application instance. This is the main application instance used to configure middleware and routes.
   */
  private readonly app: express.Application;

  /**
   * @property {AuthService} authService - The AuthService instance. This service is used to handle authentication-related operations.
   */
  private readonly authService: AuthService;

  /**
   * @property {PassportService} passportService - The PassportService instance. This service is used to configure Passport for authentication.
   */
  private readonly passportService: PassportService;

  /**
   * @constructor
   * @description Constructor for the AuthApp class. It initializes the Express application, sets up services, and configures middleware and routes.
   */
  constructor() {
    /**
     * Initialize the Express application.
     * This creates a new instance of the Express application.
     */
    this.app = express();

    /**
     * Create an instance of the AuthService using the ServiceFactory.
     * The AuthService is used to manage authentication-related operations.
     */
    this.authService = ServiceFactory.createAuthService();

    /**
     * Create an instance of the PassportService.
     * The PassportService is used to configure Passport for authentication.
     */
    this.passportService = new PassportService();

    /**
     * Configure the application middleware.
     * This sets up JSON parsing, URL-encoded data parsing, and session management.
     */
    this.config();

    /**
     * Configure Passport strategies and serialization.
     * This sets up Passport for handling authentication strategies and user serialization.
     */
    this.passportService.configurePassport();

    /**
     * Set up the application routes.
     * This defines the routes for handling authentication-related requests.
     */
    this.routes();

    /**
     * Serialize user information for session management.
     * This sets up Passport to serialize and deserialize user information in the session.
     */
    this.passportService.serializeUser();
  }

  /**
   * @method config
   * @description Configure the application middleware. This method sets up middleware for JSON parsing, URL-encoded data parsing, session management, and Passport initialization.
   */
  private config(): void {
    /**
     * Use middleware to parse JSON requests.
     * This sets up the application to handle JSON data in requests.
     */
    this.app.use(express.json());

    /**
     * Use middleware to parse URL-encoded data.
     * This sets up the application to handle URL-encoded data in requests.
     */
    this.app.use(express.urlencoded({ extended: true }));

    /**
     * Use middleware to manage sessions.
     * This sets up session management with a secret key, and configures session resave and saveUninitialized options.
     */
    this.app.use(
      session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: false,
      }),
    );

    /**
     * Initialize Passport for authentication.
     * This sets up Passport middleware for handling authentication.
     */
    this.app.use(passport.initialize());

    /**
     * Use Passport session management.
     * This sets up Passport to manage user sessions.
     */
    this.app.use(passport.session());
  }

  /**
   * @method routes
   * @description Set up the application routes. This method defines the routes for handling authentication-related requests.
   */
  private routes(): void {
    /**
     * Define the /auth route for authentication.
     * This sets up the application to use authentication routes for handling authentication-related requests.
     */
    // this.app.use('/auth', authRoutes);
  }

  /**
   * @method start
   * @description Start the Express server. This method starts the server and listens on the specified port.
   *
   * @param {number} port - The port number to listen on. This parameter specifies the port number for the server.
   */
  public start(port: number): void {
    /**
     * Start the server and listen on the specified port.
     * This sets up the server to listen for incoming requests on the specified port.
     */
    this.app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
}
