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
 /**
  * @property {string} type - Specifies the type of email service to be used, either 'smtp' or 'sendgrid'.
  * This field is used to determine which email service strategy to use for sending the email.
  */
 type: 'smtp' | 'sendgrid';

 /**
  * @property {any} config - A configuration object specific to the chosen email service, containing necessary details
  * for authentication and server connection. The structure of this object varies depending on the email service selected.
  */
 config: any;

 /**
  * @property {string} from - The sender email address, a mandatory field specifying who the email is from.
  * This field is required to ensure that the recipient knows who sent the email.
  */
 from: string;

 /**
  * @property {string} to - The recipient email address, a mandatory field specifying who the email is being sent to.
  * This field is required to ensure that the email reaches the intended recipient.
  */
 to: string;

 /**
  * @property {string} [cc] - Optional CC (carbon copy) email addresses, specifying additional recipients.
  * These recipients will receive a copy of the email, and their email addresses will be visible to all other recipients.
  */
 cc?: string;

 /**
  * @property {string} [bcc] - Optional BCC (blind carbon copy) email addresses, specifying additional recipients without
  * other recipients knowing. These recipients will receive a copy of the email, but their email addresses will not be visible
  * to other recipients.
  */
 bcc?: string;

 /**
  * @property {string} subject - The email subject, a mandatory field specifying the subject line of the email.
  * This field is required to give the recipient an idea of the email's content before opening it.
  */
 subject: string;

 /**
  * @property {string} [text] - Optional plain text version of the email body. This field provides the email content in plain text format.
  */
 text?: string;

 /**
  * @property {string} [html] - Optional HTML version of the email body. If both text and HTML are provided, the email will include both versions.
  * This field allows for richer formatting and presentation in the email content.
  */
 html?: string;

 /**
  * @property {Array<{ filename: string; path: string }>} [attachments] - Optional list of attachments to include with the email.
  * Each attachment must have a filename and a path, specifying the file to be attached to the email.
  */
 attachments?: Array<{ filename: string; path: string }>;
}
