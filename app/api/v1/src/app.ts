// src/AuthApp.ts
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { User } from './models/User';
import authRoutes from './routes/AuthRoutes';
import { AuthService } from './services/AuthService';
import { PassportService } from './services/PassportService';
import { ServiceFactory } from './factories/ServiceFactory';

export class AuthApp {
  private readonly app: express.Application;
  private readonly authService: AuthService;
  private readonly passportService: PassportService;

  constructor() {
    this.app = express();
    this.authService = ServiceFactory.createAuthService();
    this.passportService = new PassportService();

    this.config();
    this.passportService.configurePassport();
    this.routes();
    this.passportService.serializeUser();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: false,
      })
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  private routes(): void {
    //this.app.use('/auth', authRoutes);
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
}
