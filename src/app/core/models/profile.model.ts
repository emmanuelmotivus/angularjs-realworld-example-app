/**
 * Profile model
 * 
 * Represents a user profile in the application
 */
export interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface ProfileResponse {
  profile: Profile;
}
