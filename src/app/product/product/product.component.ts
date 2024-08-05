import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ICreditline } from 'src/app/models/creditLine.interface';
import { CreditlineService } from 'src/app/services/creditline.service';

@Component({
  selector: 'app-products',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductPageComponent implements OnInit {
  @Output() propagar = new EventEmitter<number>();

  credits: ICreditline[] = [];
  titlePage = "Nuestros Productos"
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
