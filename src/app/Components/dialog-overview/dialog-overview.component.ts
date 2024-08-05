import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-overview',
  templateUrl: './dialog-overview.component.html',
  styleUrls: ['./dialog-overview.component.css']
})
export class DialogOverviewComponent implements OnInit {
@Input() isModal!:  boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
