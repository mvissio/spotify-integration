import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  constructor(private _spotifyServ: SpotifyService) { }
  loading: boolean = false;

  artistsList: any[] = [];
  ngOnInit() {
  }
  buscar(term: string) {
    if (term.length > 0) {
      this.loading = true;
      this._spotifyServ.getArtists(term)
        .subscribe((data: any) => {
          this.artistsList = data;
          this.loading = false;
        });
    }
  }
}
