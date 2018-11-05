import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  token = 'BQBL8DL485vwBdgSp2vPgoaqSN1gr4jD96gOWbCqyYZpmSptGdYHvosNyrIE4pvk9CJode8XQkK1d6aSI-s';

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(url, { headers });
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20')
      .pipe(map(data => data['albums'].items));
  }

  getArtists(term: string) {
    return this.getQuery(`search?q=${term}&type=artist&limit=15`)
      .pipe(map(data => data['artists'].items));
  }
  getArtist(id: string) {
    return this.getQuery(`artists/${id}`);
  }
  getTopTracks(id: string, country:string) {
    return this.getQuery(`artists/${id}/top-tracks?country=${country}`)  
       .pipe(map(data => data['tracks']));
  }
}
