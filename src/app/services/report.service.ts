import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { POWERBIURL } from '../shared/constants';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  // Used to fetch latest powerBIData for provided reportId
  powerBIDetails(reportId): Observable<any> {
    const {loginName} = this.authService.userDataChanged.value;
    const url = `${POWERBIURL}getDashboardEmbedToken?username=${loginName}&roles=userName&pbiReportId=${reportId}`;
    return this.http.get(url);
  }
}
