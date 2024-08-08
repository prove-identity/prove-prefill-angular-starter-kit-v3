import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type ChallengeRequestResponse = {
  id: number;
  name: string;
};

const MOCK_RESPONSE_DATA: ChallengeRequestResponse = {
  id: 1,
  name: 'Sample Challenge',
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
    return this.http.get(`${this.apiUrl}/user-data`);
  }
}
