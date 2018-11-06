import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  constructor(private http: HttpClient) {
    this.http
      .get(`${this.serverUrlNewToken}/${this.clientId}/${this.clientSecret}`)
      .subscribe(
        (data: any) => {
          this.token = data.access_token;
        },
        err => {
          console.error('Error al buscar el tocken');
        }
      );
  }

  serverUrlNewToken = 'http://mvissio.ddns.net:5000/spotify';
  urlTrack = 'https://open.spotify.com/embed?uri=';
  token;
  clientId = '6d11be0e893d470dbb8a485a54877c00';
  clientSecret = '8c0e106988cb4f75bd2781a6c7dcb46f';

  getNewToken() {
    setInterval(() => {
      this.http
        .get(`${this.serverUrlNewToken}/${this.clientId}/${this.clientSecret}`)
        .subscribe(
          (data: any) => {
            this.token = data.access_token;
            console.log(this.token);
          },
          err => {
            console.error('Error al buscar el tocken');
          }
        );
    }, 3600000);
  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    return this.http.get(url, { headers });
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20').pipe(
      map(data => data['albums'].items)
    );
  }

  getArtists(term: string) {
    return this.getQuery(`search?q=${term}&type=artist&limit=15`).pipe(
      map(data => data['artists'].items)
    );
  }

  getArtist(id: string) {
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id: string, country: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=${country}`).pipe(
      map(data => data['tracks'])
    );
  }
}
