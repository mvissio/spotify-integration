import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  constructor(private http: HttpClient) {
  }

  urlTrack = 'https://open.spotify.com/embed?uri=';
  token = 'BQCVKrvRDndv5jlMxzEByfzKu9V6q0epnYVJULdQiGo035MNWGH-7EVoLJSbbRORVxhpAbIYpefeY1so3N8';

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    return this.http.get(url, {headers});
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
    return this.getQuery(`artists/${id}/top-tracks?country=${country}`)
      .pipe(
        map(data => data['tracks'])
      );
  }
}
