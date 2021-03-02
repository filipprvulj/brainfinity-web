import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PagedResult } from '../models/table.response';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  readonly BASE_URL = environment.apiUrl;
  readonly TEAMS_URL = `${this.BASE_URL}team`;

  constructor(private httpClient: HttpClient) { }

  getTeams(pageNumber: number, size: number): Observable<PagedResult<Team>> {
    const page = pageNumber.toString();
    const pageSize = size.toString();
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Bearer ${token}`);

    return this.httpClient.get<PagedResult<Team>>(this.TEAMS_URL, { headers, params: { Page: page, Size: pageSize } });
  }
}
