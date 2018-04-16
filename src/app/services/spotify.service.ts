import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {

  artists:Array<any> = [];
  tracks:Array<any> = [];
  urlSpotify:string = 'https://api.spotify.com/v1/';
  token:string = 'BQC9oJy8E-vlNjGYEgpAswzVRcRJJBbV9pdtgVi66Fo5T09Dr2C_391CE8LUzaZu_kufbkwD0FcX1mnrS4I';

  constructor(public http:HttpClient) {
    console.log("Spotify Service listo");
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'authorization': 'Bearer ' + this.token
    });
    return headers;
  }

  getTop(id:string) {
    let url = `${ this. urlSpotify }artists/${ id }/top-tracks?country=US`;
    let headers = this.getHeaders();
    return this.http.get(url, { headers });
  }

  getArtist(id:string) {
    let url = `${ this.urlSpotify }artists/${ id }`;
    let headers = this.getHeaders();
    return this.http.get(url, { headers });
               // .map( (resp: any) => {
               //   this.artistas = resp.artists.items;
               //   return this.artistas;
               // });
  }

  getArtists(term:string) {
    let url = `${ this.urlSpotify }search?query=${ term }&type=artist&limit=20`;
    let headers = this.getHeaders();

    return this.http.get(url, { headers }).map((resp:any) => {
      this.artists = resp.artists.items;
      return this.artists;
    });
  }
}
