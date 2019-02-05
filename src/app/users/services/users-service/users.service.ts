import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iuser } from 'src/app/auth/interfaces/iuser';
import { map, repeat } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  readonly BASE_URL = 'users';

  constructor(private http: HttpClient) { }

  getMyProfile(): Observable<Iuser> {
    return this.http.get<{user: Iuser}>(`${this.BASE_URL}/me`)
      .pipe(map(resp => {
        const u = resp.user;
        u.avatar = environment.baseUrl + '/' + u.avatar;
        return u;
      }));
  }

  getUserProfile(id: number): Observable<Iuser> {
    return this.http.get<{user: Iuser}>(`${this.BASE_URL}/${id}`)
      .pipe(map(resp => {
        const u = resp.user;
        u.avatar = environment.baseUrl + '/' + u.avatar;
        return u;
      }));
  }

  saveProfile(name: string, email: string): Observable<Boolean> {
    return this.http.put<{ok: Boolean}>(`${this.BASE_URL}/me`, {name: name, email: email})
      .pipe(map(resp => {
        return resp.ok;
       }));
  }

  saveAvatar(avatar: string): Observable<string> {
    return this.http.put<{avatar: string}>(`${this.BASE_URL}/me/avatar`, {avatar: avatar})
      .pipe(map(resp => {
        return resp.avatar;
      }));
  }

  savePassword(password: string): Observable<Boolean> {
    return this.http.put<{ok: Boolean}>(`${this.BASE_URL}/me/password`, {password: password})
      .pipe(map(resp => {
        return resp.ok;
      }));
  }
}
