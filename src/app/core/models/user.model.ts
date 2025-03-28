/**
 * User model
 * 
 * Represents a registered user of the application
 */
export interface User {
  email: string;
  token: string;
  username: string;
  bio?: string;
  image?: string;
}
