import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SpotifyService } from "src/app/services/spotify.service";

@Component({
  selector: "app-singer",
  templateUrl: "./singer.component.html",
  styles: []
})
export class SingerComponent {
  artist: any;
  dataReady: boolean = true;
  constructor(
    private router: ActivatedRoute,
    private spotifyServ: SpotifyService
  ) {
    router.params.subscribe(params => {
      console.log(params["id"]);
      this.getArtist(params["id"]);
    });
  }
  getArtist(id: string) {
    this.spotifyServ.getArtist(id).subscribe(artist => {
      this.artist=artist;
      this.dataReady = false;
    });
  }
  getTopTracks(id:string, nation:string){
    this.spotifyServ.getTopTracks(id, nation);
  }
}
