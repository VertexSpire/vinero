// app/api/v1/src/services/email/email.builder.ts

import { EmailValidationException } from '../../exception/email.validation.exception';

/**
 * @class EmailBuilder
 * @description Builder class for constructing email objects. This class follows the builder pattern, providing
 * a fluent interface for setting various properties of an email. It simplifies the process of creating complex
 * email objects by allowing method chaining.
 */
export class EmailBuilder {
  /**
   * @property {string} from - The sender email address. This property is mandatory and must be set before sending
   * the email. It specifies who the email is from.
   */
  public from: string;

  /**
   * @property {string} to - The recipient email address. This property is mandatory and must be set before sending
   * the email. It specifies who the email is being sent to.
   */
  public to: string;

  /**
   * @property {string} cc - The CC (carbon copy) email addresses. This property is optional and specifies additional
   * recipients who should receive a copy of the email.
   */
  public cc?: string;

  /**
   * @property {string} bcc - The BCC (blind carbon copy) email addresses. This property is optional and specifies
   * additional recipients who should receive a copy of the email without other recipients knowing.
   */
  public bcc?: string;

  /**
   * @property {string} subject - The email subject. This property is mandatory and must be set before sending
   * the email. It specifies the subject line of the email.
   */
  public subject: string;

  /**
   * @property {string} [text] - The email text content. This property is optional and provides the plain text
   * version of the email body.
   */
  public text?: string;

  /**
   * @property {string} [html] - The email HTML content. This property is optional and provides the HTML version
   * of the email body. If both text and HTML are provided, the email will include both versions.
   */
  public html?: string;

  /**
   * @property {Array<{ filename: string; path: string }>} [attachments] - The email attachments. This property is
   * optional and allows for including files with the email. Each attachment must have a filename and a path.
   */
  public attachments?: Array<{ filename: string; path: string }>;

  /**
   * @method setFrom
   * @description Sets the sender email address. This method is part of the fluent interface, allowing method chaining.
   * It sets the "from" property and returns the EmailBuilder instance for further configuration.
   * @param {string} from - The sender email address
   * @returns {EmailBuilder} - Returns the EmailBuilder instance for method chaining
   */
  setFrom(from: string): EmailBuilder {
    this.from = from;
    return this;
  }

  /**
   * @method setTo
   * @description Sets the recipient email address. This method is part of the fluent interface, allowing method chaining.
   * It sets the "to" property and returns the EmailBuilder instance for further configuration.
   * @param {string} to - The recipient email address
   * @returns {EmailBuilder} - Returns the EmailBuilder instance for method chaining
   */
  setTo(to: string): EmailBuilder {
    this.to = to;
    return this;
  }

  /**
   * @method setCc
   * @description Sets the CC email addresses. This method is part of the fluent interface, allowing method chaining.
   * It sets the "cc" property and returns the EmailBuilder instance for further configuration.
   * @param {string} cc - The CC email addresses
   * @returns {EmailBuilder} - Returns the EmailBuilder instance for method chaining
   */
  setCc(cc: string): EmailBuilder {
    this.cc = cc;
    return this;
  }

  /**
   * @method setBcc
   * @description Sets the BCC email addresses. This method is part of the fluent interface, allowing method chaining.
   * It sets the "bcc" property and returns the EmailBuilder instance for further configuration.
   * @param {string} bcc - The BCC email addresses
   * @returns {EmailBuilder} - Returns the EmailBuilder instance for method chaining
   */
  setBcc(bcc: string): EmailBuilder {
    this.bcc = bcc;
    return this;
  }

  /**
   * @method setSubject
   * @description Sets the email subject. This method is part of the fluent interface, allowing method chaining.
   * It sets the "subject" property and returns the EmailBuilder instance for further configuration.
   * @param {string} subject - The email subject
   * @returns {EmailBuilder} - Returns the EmailBuilder instance for method chaining
   */
  setSubject(subject: string): EmailBuilder {
    this.subject = subject;
    return this;
  }

  /**
   * @method setText
   * @description Sets the email text content. This method is part of the fluent interface, allowing method chaining.
   * It sets the "text" property and returns the EmailBuilder instance for further configuration.
   * @param {string} text - The email text content
   * @returns {EmailBuilder} - Returns the EmailBuilder instance for method chaining
   */
  setText(text: string): EmailBuilder {
    this.text = text;
    return this;
  }

  /**
   * @method setHtml
   * @description Sets the email HTML content. This method is part of the fluent interface, allowing method chaining.
   * It sets the "html" property and returns the EmailBuilder instance for further configuration.
   * @param {string} html - The email HTML content
   * @returns {EmailBuilder} - Returns the EmailBuilder instance for method chaining
   */
  setHtml(html: string): EmailBuilder {
    this.html = html;
    return this;
  }

  /**
   * @method setAttachments
   * @description Sets the email attachments. This method is part of the fluent interface, allowing method chaining.
   * It sets the "attachments" property and returns the EmailBuilder instance for further configuration.
   * @param {Array<{ filename: string; path: string }>} attachments - The email attachments
   * @returns {EmailBuilder} - Returns the EmailBuilder instance for method chaining
   */
  setAttachments(attachments: Array<{ filename: string; path: string }>): EmailBuilder {
    this.attachments = attachments;
    return this;
  }

  /**
   * @method validate
   * @description Validates the email properties. This method checks that all mandatory properties are set and throws
   * an EmailValidationException if any required property is missing or invalid. It ensures that the email object is
   * properly constructed before it is sent, preventing runtime errors and ensuring data integrity.
   * @throws {EmailValidationException} - Throws an exception if a required property is missing or invalid
   */
  private validate(): void {
    /**
     * Checks if the "from" property is set. If not, throws an EmailValidationException with a specific error code.
     * This ensures that the sender email address is always provided.
     */
    if (!this.from) {
      throw new EmailValidationException('Email "from" address is required.', 'ERR_FROM_ADDRESS');
    }

    /**
     * Checks if the "to" property is set. If not, throws an EmailValidationException with a specific error code.
     * This ensures that the recipient email address is always provided.
     */
    if (!this.to) {
      throw new EmailValidationException('Email "to" address is required.', 'ERR_TO_ADDRESS');
    }

    /**
     * Checks if the "subject" property is set. If not, throws an EmailValidationException with a specific error code.
     * This ensures that the email subject is always provided.
     */
    if (!this.subject) {
      throw new EmailValidationException('Email "subject" is required.', 'ERR_SUBJECT');
    }

    /**
     * Checks if either the "text" or "html" property is set. If neither is set, throws an EmailValidationException
     * with a specific error code. This ensures that the email content is always provided in either text or HTML format.
     */
    if (!this.text && !this.html) {
      throw new EmailValidationException('Email content (text or HTML) is required.', 'ERR_CONTENT');
    }
  }

  /**
   * @method build
   * @description Validates and builds the email object. This method first calls the validate method to ensure that
   * all required properties are set correctly. If validation passes, it returns the constructed EmailBuilder instance.
   * This final step in the builder pattern ensures that the email object is fully constructed and ready to be sent.
   * @returns {EmailBuilder} - Returns the validated EmailBuilder instance
   */
  build(): EmailBuilder {
    /**
     * Validates the email properties before building the email object. This step ensures that the email object
     * meets all necessary criteria and is ready for sending.
     */
    this.validate();
    /**
     * Returns the constructed EmailBuilder instance. The email object is now fully built and ready to be used
     * by an email service to send the email.
     */
    return this;
  }
}
