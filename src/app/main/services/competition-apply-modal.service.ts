import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Competition } from '../models/competition.model';

@Injectable({
  providedIn: 'root'
})
export class CompetitionApplyModalService {

  readonly BASE_URL = environment.apiUrl;
  readonly COMPETITION_URL = `${this.BASE_URL}competition`;

  constructor(private httpClient: HttpClient) { }

  getCompetitions(): any {

    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Bearer ${token}`);

    return this.httpClient.get<Competition[]>(this.COMPETITION_URL, { headers, params: { page: "1", pageItemCount: "5" } });
  }
}
