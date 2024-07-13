// src/common/enums/auth.enum.ts

/**
 * @enum AuthStrategies
 * @description Enumeration representing the different authentication strategies supported by the application.
 * This enum provides a convenient way to reference the supported authentication methods throughout the codebase,
 * ensuring consistency and reducing the likelihood of typos or mismatches in strategy names.
 *
 * Available Strategies:
 * - Local: Represents the local authentication strategy using a username and password.
 * - Google: Represents the Google authentication strategy, allowing users to authenticate using their Google account.
 * - Jwt: Represents the JWT (JSON Web Token) authentication strategy, using tokens for stateless authentication.
 * - Facebook: Represents the Facebook authentication strategy, allowing users to authenticate using their Facebook account.
 * - Twitter: Represents the Twitter authentication strategy, allowing users to authenticate using their Twitter account.
 * - GitHub: Represents the GitHub authentication strategy, allowing users to authenticate using their GitHub account.
 */
export enum AuthStrategies {
  /**
   * @member {string} Local - Represents the local authentication strategy using a username and password.
   */
  Local = 'local',

  /**
   * @member {string} Google - Represents the Google authentication strategy, allowing users to authenticate using their Google account.
   */
  Google = 'google',

  /**
   * @member {string} Jwt - Represents the JWT (JSON Web Token) authentication strategy, using tokens for stateless authentication.
   */
  Jwt = 'jwt',

  /**
   * @member {string} Facebook - Represents the Facebook authentication strategy, allowing users to authenticate using their Facebook account.
   */
  Facebook = 'facebook',

  /**
   * @member {string} Twitter - Represents the Twitter authentication strategy, allowing users to authenticate using their Twitter account.
   */
  Twitter = 'twitter',

  /**
   * @member {string} GitHub - Represents the GitHub authentication strategy, allowing users to authenticate using their GitHub account.
   */
  GitHub = 'github',
}
