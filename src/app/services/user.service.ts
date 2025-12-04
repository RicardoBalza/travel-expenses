import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';
import { UserResponse } from "../Shared/Models/Login/loginDTO";

export interface User {
  id: number;
  // Agrega aquí más propiedades según la respuesta de tu API
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) { }

  private currentUser = new BehaviorSubject<UserResponse>(new UserResponse());
  dataBridge$ = this.currentUser.asObservable();

  setDataBridge(data: UserResponse) {
    this.currentUser.next(data);
  }

  /**
   * Obtiene un usuario por su ID
   * @param id ID del usuario a buscar
   * @returns Observable con los datos del usuario
   */
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  /**
   * Obtiene todos los usuarios
   * @returns Observable con el array de usuarios
   */
  getUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(`${this.apiUrl}/users`);
  }

  login(email: string, password: string): Observable<UserResponse> {
    const body = {
      email,
      password
    };

    return this.http.post<UserResponse>(`${this.apiUrl}/auth/login`, body);
  }

}
