import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public servis: DataService) {}

  ngOnInit() {}
  OturumKapat() {
    localStorage.clear();
    location.href = '/';
  }
}
