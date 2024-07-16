import { EmailValidationException } from '../../exception/email.validation.exception';

/**
 * @class EmailBuilder
 * @description Builder class for constructing email objects. This class follows the builder pattern, providing
 * a fluent interface for setting various properties of an email. It simplifies the process of creating complex
 * email objects by allowing method chaining. This class ensures that mandatory properties are set and validates
 * the email before building it.
 * @property {string} from - The sender email address. This property is mandatory and must be set before sending
 * the email. It specifies who the email is from.
 * @property {string} to - The recipient email address. This property is mandatory and must be set before sending
 * the email. It specifies who the email is being sent to.
 * @property {string} cc - The CC (carbon copy) email addresses. This property is optional and specifies additional
 * recipients who should receive a copy of the email.
 * @property {string} bcc - The BCC (blind carbon copy) email addresses. This property is optional and specifies
 * additional recipients who should receive a copy of the email without other recipients knowing.
 * @property {string} subject - The email subject. This property is mandatory and must be set before sending
 * the email. It specifies the subject line of the email.
 * @property {string} [text] - The email text content. This property is optional and provides the plain text
 * version of the email body.
 * @property {string} [html] - The email HTML content. This property is optional and provides the HTML version
 * of the email body. If both text and HTML are provided, the email will include both versions.
 * @property {Array<{ filename: string; path: string }>} [attachments] - The email attachments. This property is
 * optional and allows for including files with the email. Each attachment must have a filename and a path.
 * @method setFrom - Sets the sender email address.
 * @method setTo - Sets the recipient email address.
 * @method setCc - Sets the CC email addresses.
 * @method setBcc - Sets the BCC email addresses.
 * @method setSubject - Sets the email subject.
 * @method setText - Sets the email text content.
 * @method setHtml - Sets the email HTML content.
 * @method setAttachments - Sets the email attachments.
 * @method validate - Validates the email properties.
 * @method build - Validates and builds the email object.
 * @throws {EmailValidationException} - Throws an exception if a required property is missing or invalid.
 * @returns {EmailBuilder} - Returns the EmailBuilder instance for method chaining.
 * @returns {EmailBuilder} - Returns the validated EmailBuilder instance.
 * @author Wasif Farooq
 */
export class EmailBuilder {
 /**
  * The sender email address.
  * @type {string}
  */
 public from: string;

 /**
  * The recipient email address.
  * @type {string}
  */
 public to: string;

 /**
  * The CC email addresses.
  * @type {string}
  * @optional
  */
 public cc?: string;

 /**
  * The BCC email addresses.
  * @type {string}
  * @optional
  */
 public bcc?: string;

 /**
  * The email subject.
  * @type {string}
  */
 public subject: string;

 /**
  * The email text content.
  * @type {string}
  * @optional
  */
 public text?: string;

 /**
  * The email HTML content.
  * @type {string}
  * @optional
  */
 public html?: string;

 /**
  * The email attachments.
  * @type {Array<{ filename: string; path: string }>}
  * @optional
  */
 public attachments?: Array<{ filename: string; path: string }>;

 /**
  * Sets the sender email address.
  * @param {string} from - The sender email address.
  * @returns {EmailBuilder} - Returns the EmailBuilder instance for method chaining.
  */
 setFrom(from: string): EmailBuilder {
  /**
   * Assigns the provided sender email address to the 'from' property.
   *
   * The 'from' property specifies the email address from which the email
   * will be sent. This is a mandatory field that must be set before the
   * email can be built and sent. If this property is not set, the validation
   * step will fail.
   */
  this.from = from;

  /**
   * Returns the current instance of EmailBuilder for method chaining.
   *
   * By returning 'this', we allow the method calls to be chained together.
   * This is a key feature of the builder pattern, providing a fluent API
   * for configuring the email properties.
   */
  return this;
 }

 /**
  * Sets the recipient email address.
  * @param {string} to - The recipient email address.
  * @returns {EmailBuilder} - Returns the EmailBuilder instance for method chaining.
  */
 setTo(to: string): EmailBuilder {
  /**
   * Assigns the provided recipient email address to the 'to' property.
   *
   * The 'to' property specifies the primary recipient of the email.
   * This is a mandatory field that must be set before the email can be
   * built and sent. If this property is not set, the validation step will fail.
   */
  this.to = to;

  /**
   * Returns the current instance of EmailBuilder for method chaining.
   *
   * By returning 'this', we allow the method calls to be chained together.
   * This is a key feature of the builder pattern, providing a fluent API
   * for configuring the email properties.
   */
  return this;
 }

 /**
  * Sets the CC email addresses.
  * @param {string} cc - The CC email addresses.
  * @returns {EmailBuilder} - Returns the EmailBuilder instance for method chaining.
  */
 setCc(cc: string): EmailBuilder {
  /**
   * Assigns the provided CC email addresses to the 'cc' property.
   *
   * The 'cc' property specifies additional recipients who should receive
   * a copy of the email. This field is optional and can be set based on
   * the specific requirements of the email being sent.
   */
  this.cc = cc;

  /**
   * Returns the current instance of EmailBuilder for method chaining.
   *
   * By returning 'this', we allow the method calls to be chained together.
   * This is a key feature of the builder pattern, providing a fluent API
   * for configuring the email properties.
   */
  return this;
 }

 /**
  * Sets the BCC email addresses.
  * @param {string} bcc - The BCC email addresses.
  * @returns {EmailBuilder} - Returns the EmailBuilder instance for method chaining.
  */
 setBcc(bcc: string): EmailBuilder {
  /**
   * Assigns the provided BCC email addresses to the 'bcc' property.
   *
   * The 'bcc' property specifies additional recipients who should receive
   * a copy of the email without other recipients knowing. This field is
   * optional and can be set based on the specific requirements of the email
   * being sent.
   */
  this.bcc = bcc;

  /**
   * Returns the current instance of EmailBuilder for method chaining.
   *
   * By returning 'this', we allow the method calls to be chained together.
   * This is a key feature of the builder pattern, providing a fluent API
   * for configuring the email properties.
   */
  return this;
 }

 /**
  * Sets the email subject.
  * @param {string} subject - The email subject.
  * @returns {EmailBuilder} - Returns the EmailBuilder instance for method chaining.
  */
 setSubject(subject: string): EmailBuilder {
  /**
   * Assigns the provided subject to the 'subject' property.
   *
   * The 'subject' property specifies the subject line of the email.
   * This is a mandatory field that must be set before the email can be
   * built and sent. If this property is not set, the validation step will fail.
   */
  this.subject = subject;

  /**
   * Returns the current instance of EmailBuilder for method chaining.
   *
   * By returning 'this', we allow the method calls to be chained together.
   * This is a key feature of the builder pattern, providing a fluent API
   * for configuring the email properties.
   */
  return this;
 }

 /**
  * Sets the email text content.
  * @param {string} text - The email text content.
  * @returns {EmailBuilder} - Returns the EmailBuilder instance for method chaining.
  */
 setText(text: string): EmailBuilder {
  /**
   * Assigns the provided text content to the 'text' property.
   *
   * The 'text' property specifies the plain text version of the email body.
   * This field is optional and can be set based on the specific requirements
   * of the email being sent. If both 'text' and 'html' properties are set,
   * the email will include both versions.
   */
  this.text = text;

  /**
   * Returns the current instance of EmailBuilder for method chaining.
   *
   * By returning 'this', we allow the method calls to be chained together.
   * This is a key feature of the builder pattern, providing a fluent API
   * for configuring the email properties.
   */
  return this;
 }

 /**
  * Sets the email HTML content.
  * @param {string} html - The email HTML content.
  * @returns {EmailBuilder} - Returns the EmailBuilder instance for method chaining.
  */
 setHtml(html: string): EmailBuilder {
  /**
   * Assigns the provided HTML content to the 'html' property.
   *
   * The 'html' property specifies the HTML version of the email body.
   * This field is optional and can be set based on the specific requirements
   * of the email being sent. If both 'text' and 'html' properties are set,
   * the email will include both versions.
   */
  this.html = html;

  /**
   * Returns the current instance of EmailBuilder for method chaining.
   *
   * By returning 'this', we allow the method calls to be chained together.
   * This is a key feature of the builder pattern, providing a fluent API
   * for configuring the email properties.
   */
  return this;
 }

 /**
  * Sets the email attachments.
  * @param {Array<{ filename: string; path: string }>} attachments - The email attachments.
  * @returns {EmailBuilder} - Returns the EmailBuilder instance for method chaining.
  */
 setAttachments(attachments: Array<{ filename: string; path: string }>): EmailBuilder {
  /**
   * Assigns the provided attachments to the 'attachments' property.
   *
   * The 'attachments' property allows for including files with the email.
   * Each attachment must have a filename and a path. This field is optional
   * and can be set based on the specific requirements of the email being sent.
   */
  this.attachments = attachments;

  /**
   * Returns the current instance of EmailBuilder for method chaining.
   *
   * By returning 'this', we allow the method calls to be chained together.
   * This is a key feature of the builder pattern, providing a fluent API
   * for configuring the email properties.
   */
  return this;
 }

 /**
  * Validates the email properties.
  * @throws {EmailValidationException} - Throws an exception if a required property is missing or invalid.
  * @private
  */
 private validate(): void {
  /**
   * Checks if the 'from' property is set. If not, throws an EmailValidationException with a specific error code.
   *
   * This ensures that the sender email address is always provided. The 'from' property
   * is mandatory and must be set before the email can be built and sent.
   */
  if (!this.from) {
   throw new EmailValidationException('Email "from" address is required.', 'ERR_FROM_ADDRESS');
  }

  /**
   * Checks if the 'to' property is set. If not, throws an EmailValidationException with a specific error code.
   *
   * This ensures that the recipient email address is always provided. The 'to' property
   * is mandatory and must be set before the email can be built and sent.
   */
  if (!this.to) {
   throw new EmailValidationException('Email "to" address is required.', 'ERR_TO_ADDRESS');
  }

  /**
   * Checks if the 'subject' property is set. If not, throws an EmailValidationException with a specific error code.
   *
   * This ensures that the email subject is always provided. The 'subject' property
   * is mandatory and must be set before the email can be built and sent.
   */
  if (!this.subject) {
   throw new EmailValidationException('Email "subject" is required.', 'ERR_SUBJECT');
  }

  /**
   * Checks if either the 'text' or 'html' property is set. If neither is set, throws an EmailValidationException
   * with a specific error code.
   *
   * This ensures that the email content is always provided in either text or HTML format.
   * At least one of these properties must be set before the email can be built and sent.
   */
  if (!this.text && !this.html) {
   throw new EmailValidationException('Email content (text or HTML) is required.', 'ERR_CONTENT');
  }
 }

 /**
  * Validates and builds the email object.
  * @returns {EmailBuilder} - Returns the validated EmailBuilder instance.
  */
 build(): EmailBuilder {
  /**
   * Validates the email properties before building the email object.
   *
   * This step ensures that the email object meets all necessary criteria and is ready
   * for sending. The validate method checks that all required properties are set correctly.
   */
  this.validate();

  /**
   * Returns the constructed EmailBuilder instance.
   *
   * The email object is now fully built and ready to be used by an email service to send the email.
   * By returning the current instance, the builder pattern is completed and the email is ready.
   */
  return this;
 }
}
