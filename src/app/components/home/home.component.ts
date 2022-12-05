import { MytoastService } from './../../services/mytoast.service';
import { Modal } from 'bootstrap';
import { Sonuc } from './../../models/Sonuc';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Araba } from './../../models/Araba';
import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  arabalar!: Araba[];
  secAraba!: Araba;
  modal!: Modal;
  imgUrl!: string;
  modalBaslik!: string;
  arabaadi!: string;
  arabamodel!: string;
  vites!: string;
  yakit!: string;
  kirucret!: number;
  kiralanmadurumu!: string;
  constructor(
    public servis: DataService,
    public route: ActivatedRoute,
    public toast: MytoastService
  ) {}

  ngOnInit() {
    this.ArabaListele();
  }
  ArabaListele() {
    this.servis.ArabaListele().subscribe((d) => {
      this.arabalar = d;
    });
  }

  Goruntule(araba: Araba, el: HTMLElement) {
    this.modalBaslik = araba.arabaadi + ' ' + araba.arabamodel;
    this.imgUrl = araba.imgUrl;
    this.arabaadi = araba.arabaadi;
    this.arabamodel = araba.arabamodel;
    this.vites = araba.vites;
    this.yakit = araba.arabakategorisi;
    this.kirucret = araba.kirucret;
    this.kiralanmadurumu = araba.kiralik;
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
}
