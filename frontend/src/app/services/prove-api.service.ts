import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user';

export type ChallengeRequestResponse = {
  id: number;
  phonenumber: number;
};

const MOCK_RESPONSE_DATA: ChallengeRequestResponse = {
  id: 1,
  phonenumber: 0,
};

@Injectable({
  providedIn: 'root',
})
export class ProveApiService {
  private apiUrl = ''; // Replace with your API URL

  constructor(private http: HttpClient) {}

  mockResponse(): ChallengeRequestResponse {
    return MOCK_RESPONSE_DATA;
  }

  challengeRequest(): Observable<any> {
    return this.http.get(`${this.apiUrl}/data`);
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/user/all`);
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/user/add`, user);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/user/update`, user);
  }

  public deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/user/delete/${id}`);
  }
}
