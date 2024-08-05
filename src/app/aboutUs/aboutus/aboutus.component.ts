import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  
  active = 'top';
  titlePage = "Nosotros";
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 3
      },
      940: {
        items:3
      }
    },
    nav: true
  }
   
    slides = [
      {id: 1, text:"Somos un grupo de personas con principios solidarios.", img: "img/1.png"},
      {id: 2, text:"Amamos a nuestro país, cumplimos sus leyes y ayudamos a su progreso.", img: "img/2.png"},
      {id: 3, text:"Queremos ser mejores y por eso apoyamos la educación de quienes nos rodean.", img: "img/3.png"},
      {id: 4, text:"Somos ahorradores porque tenemos sueños y metas que deseamos cumplir.", img: "img/4.png"},
      {id: 5, text:"Queremos que todos tengamos una mejor calidad de vida.", img: "img/5.png"},
      {id: 6, text:"Nos cuidamos mutuamente y no ponemos a los compañeros en peligro de impago de sus obligaciones.", img: "img/6.png"},
      {id: 7, text:"Los ahorros de todos los cuidamos como si fueran nuestros.", img: "img/7.png"},
      {id: 8, text:"Somos prudentes con la plata que prestamos y con la que recibimos prestada.", img: "img/8.png"}
    ];

  constructor() { }

  ngOnInit(): void {
  }

}
