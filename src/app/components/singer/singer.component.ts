import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SpotifyService} from 'src/app/services/spotify.service';

@Component({
  selector: 'app-singer',
  templateUrl: './singer.component.html',
  styles: []
})
export class SingerComponent {
  artist: any;
  topTracks: any[] = [];
  dataReady: boolean = true;

  constructor(
    private router: ActivatedRoute,
    public spotifyServ: SpotifyService
  ) {
    router.params.subscribe(params => {
      this.getArtist(params['id']);
      this.getTopTracks(params['id']);
    });
  }

  getArtist(id: string) {
    this.spotifyServ.getArtist(id).subscribe(artist => {
      this.artist = artist;
      this.dataReady = false;
    });
  }

  getTopTracks(id: string, nation?: string) {
    nation = 'ES';
    this.spotifyServ.getTopTracks(id, nation).subscribe(tracks => {
      this.topTracks = tracks;
    });
  }
}
