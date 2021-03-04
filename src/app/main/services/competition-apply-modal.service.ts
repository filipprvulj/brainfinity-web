import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Competition } from '../models/competition.model';
import { TeamService } from './team.service';

@Injectable({
  providedIn: 'root'
})
export class CompetitionApplyModalService {
  readonly BASE_URL = environment.apiUrl;
  readonly COMPETITION_URL = `${this.BASE_URL}competition/incoming`;
  readonly APPLY_URL = `${this.BASE_URL}team`;

  constructor(private httpClient: HttpClient) { }

  getCompetitions(): any {

    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Bearer ${token}`);

    return this.httpClient.get<Competition[]>(this.COMPETITION_URL, { headers });
  }

  applyForCompetition(teamId: string, competitionId: string): Observable<any> {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', `Bearer ${token}`);

    return this.httpClient.put<any>(`${this.APPLY_URL}\\${teamId}`, JSON.stringify({ 'competitionId': competitionId }), { headers: headers, responseType: "text" as "json" }
    );
  }


}
