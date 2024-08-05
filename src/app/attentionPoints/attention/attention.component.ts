import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-attention',
  templateUrl: './attention.component.html',
  styleUrls: ['./attention.component.css']
})
export class AttentionComponent implements OnInit {

  titlePage = "Puntos de Atención";
  titlePageNwetwork = "Nuestras Redes Sociales"
  visiblePage = this.route.snapshot.paramMap.get('filter');
  visible: boolean = false;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadPage();
  }

loadPage(){
  if(this.visiblePage == "true" ){
    this.visible = true;
  }else{
    this.visible = false;
  }
}  

}
