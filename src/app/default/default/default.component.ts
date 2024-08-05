import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogOverviewComponent } from 'src/app/Components/dialog-overview/dialog-overview.component';

declare var jQuery: any;


@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  public isModal!: boolean ;


  constructor(public dialog: MatDialog) { 
  }

  ngOnInit(): void {
    this.isModal= true;
    /*--------- se habilita el Popup del sitio 
    this.dialog.open(DialogOverviewComponent);------ */

    (function ($) {
      $(document).ready(function(){
        
          var counter = 0;
          var c = 0;
          var i = setInterval(function(){
            $(".loading-page .counter h1").html(c + "%");
            $(".loading-page .counter hr").css("width", c + "%");            
            $(".loading-page .counter h1.color").css("width", c + "%");
            
            counter++;
            c++;
            
            if(counter == 101) {
              clearInterval(i);
            }
          }, 50);
            $('.loading-page').delay(1000).fadeOut('slow');
      });      
    })(jQuery);
  }

}
