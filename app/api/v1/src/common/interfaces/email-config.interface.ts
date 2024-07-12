// src/common/interfaces/email-config.interface.ts

/**
 * @interface EmailConfig
 * @description Interface for the email configuration object. This interface defines the structure of the configuration
 * object required for sending emails using different email services. It includes the type of email service to be used,
 * the service-specific configuration, and all necessary details for the email such as the sender, recipient, subject,
 * body, and attachments.
 *
 * Properties:
 * - type: Specifies the type of email service to be used, either 'smtp' or 'sendgrid'.
 * - config: A configuration object specific to the chosen email service, containing necessary details for authentication
 *   and server connection.
 * - from: The sender email address, a mandatory field specifying who the email is from.
 * - to: The recipient email address, a mandatory field specifying who the email is being sent to.
 * - cc: Optional CC (carbon copy) email addresses, specifying additional recipients.
 * - bcc: Optional BCC (blind carbon copy) email addresses, specifying additional recipients without other recipients knowing.
 * - subject: The email subject, a mandatory field specifying the subject line of the email.
 * - text: Optional plain text version of the email body.
 * - html: Optional HTML version of the email body. If both text and HTML are provided, the email will include both versions.
 * - attachments: Optional list of attachments to include with the email. Each attachment must have a filename and a path.
 */
export interface EmailConfig {
  type: 'smtp' | 'sendgrid';
  config: any; // Specific configuration for the email service
  from: string;
  to: string;
  cc?: string;
  bcc?: string;
  subject: string;
  text?: string;
  html?: string;
  attachments?: Array<{ filename: string; path: string }>;
}
