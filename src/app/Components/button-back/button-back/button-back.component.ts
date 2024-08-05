import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-button-back',
  templateUrl: './button-back.component.html',
  styleUrls: ['./button-back.component.css']
})
export class ButtonBackComponent implements OnInit {

  constructor( private location: Location) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
     
  }

}
