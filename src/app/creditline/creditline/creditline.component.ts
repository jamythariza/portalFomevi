import { Component, OnInit,Output, EventEmitter   } from '@angular/core';
import { CreditlineService} from '../../services/creditline.service'
import {ICreditline} from '../../models/creditLine.interface'
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creditline',
  templateUrl: './creditline.component.html',
  styleUrls: ['./creditline.component.css']
})
export class CreditlineComponent implements OnInit {

credits: ICreditline[] = [];
titlePage = "Líneas de Crédito";

  @Output()
  propagar = new EventEmitter<number>();

customOptions: OwlOptions = {
  loop: true,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['<', '>'],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    }
  },
  nav: true
}
 
  slides = [
    {id: 1, img: "../img/product-house.png"},
    {id: 2, img: "../img/product-book.png"},
    {id: 3, img: "../img/product-calamidad.png"},
    {id: 4, img: "../img/product-shop.png"},
    {id: 5, img: "../img/product-house-reparation.png"},
    {id: 6, img: "../img/product-shop-house.png"},
    {id: 7, img: "../img/product-fast-credit.png"},
    {id: 8, img: "../img/product-vehicle.png"},
    {id: 9, img: "../img/product-impuesto.png"},
    {id: 10, img: "../img/product-agreement.png"},
    {id: 11, img: "../img/product-card.png"},
    {id: 12, img: "../img/product-chrismas.png"},
    {id: 13, img: "../img/product-ecologic.png"},
    {id: 14, img: "../img/product-escolar.png"},
    {id: 15, img: "../img/product-rotate.png"},
  ];


  ngOnInit(): void {
    this.get();
  }
  constructor(  private service: CreditlineService,private router: Router) { 
  }
  
  get(){ 
    let lista: ICreditline[] = [];
    this.service.getAll().subscribe(news => {
      lista = news;
      
      this.slides.forEach(function(value, key){
        lista[key].image = value.img;
      });

      this.credits = lista;
    })
  }

  onDetail(id: number){
    this.router.navigate(['/creditdetail/'+id]);
    this.propagar.emit(id);

  }

}
