import { Kategori } from './../../models/Kategori';
import { Araba } from './../../models/Araba';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { Sonuc } from 'src/app/models/Sonuc';
import { DataService } from 'src/app/services/data.service';
import { MytoastService } from 'src/app/services/mytoast.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-araclar',
  templateUrl: './araclar.component.html',
  styleUrls: ['./araclar.component.scss'],
})
export class AraclarComponent implements OnInit {
  kiralik!: boolean;
  katId: number = 0;
  secKat: Kategori = new Kategori();
  kategoriler!: Kategori[];
  arabalar!: Araba[];
  modal!: Modal;
  modalBaslik: string = '';
  secAraba!: Araba;
  sonuc: Sonuc = new Sonuc();
  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    arabaadi: new FormControl(),
    arabakategorisi: new FormControl(),
    kiralik: new FormControl(),
    vites: new FormControl(),
    iadetarih: new FormControl(),
    kirtarih: new FormControl(),
    imgUrl: new FormControl(),
    arabamodel: new FormControl(),
  });
  constructor(
    public servis: DataService,
    public toast: MytoastService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.ArabaListele();
    this.route.params.subscribe((p: any) => {
      if (p.katId) {
        this.katId = p.katId;
        this.KategoriGetir();
      }
    });
    this.KategoriListele();
  }
  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.frm.patchValue({ admin: 0 });
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = 'Araba Ekle';
    this.modal.show();
  }
  Duzenle(araba: Araba, el: HTMLElement) {
    this.frm.patchValue(araba);
    this.modalBaslik = 'Araba Düzenle';
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(araba: Araba, el: HTMLElement) {
    this.secAraba = araba;
    this.modalBaslik = 'Araba Sil';
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  ArabaListele() {
    this.servis.ArabaListele().subscribe((d) => {
      this.arabalar = d;
    });
  }
  KategoriListele() {
    this.servis.KategoriListele().subscribe((d) => {
      this.kategoriler = d;
    });
  }
  AracEkleDuzenle() {
    var araba: Araba = this.frm.value;
    this.KategoriListele();
    if (!araba.arabaadi || !araba.imgUrl || !araba.kiralik || !araba.vites) {
      this.sonuc.islem = false;
      this.sonuc.mesaj = 'Alanlar boş geçilemez';
      this.toast.ToastUygula(this.sonuc);
    } else {
      if (!araba.id) {
        var filtre = this.arabalar.filter((s) => s.arabaadi == araba.arabaadi);
        if (filtre.length > 0) {
          this.sonuc.islem = false;
          this.sonuc.mesaj = 'Girilen Araba Adı Kayıtlıdır!';
          this.toast.ToastUygula(this.sonuc);
        } else {
          this.servis.ArabaEkle(araba).subscribe((d) => {
            this.sonuc.islem = true;
            this.sonuc.mesaj = 'Araba Eklendi';
            this.toast.ToastUygula(this.sonuc);
            this.ArabaListele();
            this.modal.toggle();
          });
        }
      } else {
        this.servis.ArabaDuzenle(araba).subscribe((d) => {
          this.sonuc.islem = true;
          this.sonuc.mesaj = 'Araba Düzenlendi';
          this.toast.ToastUygula(this.sonuc);
          this.ArabaListele();
          this.modal.toggle();
        });
      }
    }
  }
  ArabaSil() {
    this.servis.ArabaSil(this.secAraba.id).subscribe((d) => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = 'Araba Silindi';
      this.toast.ToastUygula(this.sonuc);
      this.ArabaListele();
      this.modal.toggle();
    });
  }
  KiralaDuzenle() {
    var tarih = new Date();
    var araba: Araba = this.frm.value;
    if (!araba.arabakategorisi || !araba.kiralik) {
      this.sonuc.islem = false;
      this.sonuc.mesaj = 'Alanlar boş geçilemez';
      this.toast.ToastUygula(this.sonuc);
    } else {
      if (!araba.id) {
        var filtre = this.arabalar.filter((s) => s.arabaadi == araba.arabaadi);
        if (filtre.length > 0) {
          this.sonuc.islem = false;
          this.sonuc.mesaj = 'Girilen Araba Adı Kayıtlıdır!';
          this.toast.ToastUygula(this.sonuc);
        } else {
          this.servis.ArabaEkle(araba).subscribe((d) => {
            this.sonuc.islem = true;
            this.sonuc.mesaj = 'Araba Eklendi';
            this.toast.ToastUygula(this.sonuc);
            this.ArabaListele();
            this.modal.toggle();
          });
        }
      } else {
        this.servis.ArabaDuzenle(araba).subscribe((d) => {
          this.sonuc.islem = true;
          this.sonuc.mesaj = 'Araba Düzenlendi';
          this.toast.ToastUygula(this.sonuc);
          this.ArabaListele();
          this.modal.toggle();
        });
      }
    }
  }

  KategoriGetir() {
    this.servis.KategoriById(this.katId).subscribe((d) => {
      this.secKat = d;
      this.ArabaListele();
    });
  }
}
