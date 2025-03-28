import { Injectable } from '@angular/core';

/**
 * Service that provides application constants throughout the app
 * This is a migration of the AngularJS constants pattern to Angular services
 */
@Injectable({
  providedIn: 'root'
})
export class AppConstants {
  /**
   * API endpoint for backend services
   */
  public readonly api: string = 'https://conduit.productionready.io/api';
  
  /**
   * Local storage key for storing the JWT token
   */
  public readonly jwtKey: string = 'jwtToken';
  
  /**
   * Application name used for display purposes
   */
  public readonly appName: string = 'Conduit';
}
