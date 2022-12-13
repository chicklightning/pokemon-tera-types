import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Nerds & Dragons';
  route: string;

  constructor(location: Location, router: Router) {
    router.events.subscribe((val) => {
      if(location.path() != '') {
        this.route = location.path();
      }
      else {
        this.route = 'Home';
      }
    })
  }

  ngOnInit(): void {
  }

}
