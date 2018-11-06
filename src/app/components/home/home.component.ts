import {Component} from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent{
  loading: boolean;
  newSongs: any[] = [];
  errorMessage;
  error = false;

  constructor(private _spotifyServ: SpotifyService) {
    this.loading = true;
    _spotifyServ.getNewToken();
    this.findData();
  }

  findData(){
    setTimeout(() => {
      this._spotifyServ.getNewReleases().subscribe((data: any) => {
        this.newSongs = data;
        this.loading = false;
      }, (errService) => {
        this.error = true;
        this.loading = false;
        this.errorMessage = errService.error.error.message;
      });
    }, 1000);
  }

}
