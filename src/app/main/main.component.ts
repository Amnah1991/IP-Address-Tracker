import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { } from 'googlemaps';
import { error } from 'protractor';
import { combineLatest } from 'rxjs';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {
  @ViewChild('map', { static: true }) mapElement: any;
  map: google.maps.Map;
  marker = new google.maps.Marker;
  searchInput = '';
  result: any;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.getInfo('');
  }

  getInfo(searchInput) {
    var ipAddress = '', domain = '';
    if (this.validateIPaddress(searchInput)) {
      ipAddress = searchInput;
    } else {
      domain = searchInput;
    }
    this.httpClient.get(`https://geo.ipify.org/api/v1?apiKey=at_8n3IiZ6SSLNU642IFgHstKRpKqYGh
    &ipAddress=${ipAddress}&domain=${domain}`)
      .subscribe((data: any) => {
        this.result = data;
        this.displayMap(this.result.location.lat, this.result.location.lng);
      },
        error => {
          alert("Invalid input");
        });
  }



  displayMap(lat, lng) {
    const mapProperties = {
      center: new google.maps.LatLng(lat, lng),
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);

    this.marker = new google.maps.Marker({
      position: { lat, lng },
    });

    this.marker.setMap(this.map);
  }

  validateIPaddress(ipaddress) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
      return (true)
    }
    return (false)
  }

}
