import { Component, OnInit } from '@angular/core';
import {NgsRevealConfig} from 'ng-scrollreveal';

declare var jQuery: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor( config: NgsRevealConfig) 
    { 
      config.duration = 500;
      config.easing = 'cubic-bezier(0.645, 0.045, 0.355, 1)';
      config.origin= 'top'
    }

  ngOnInit(): void {
    (function ($) {
      $(document).ready(function() {

        $("#widget").click(function() {   
          $(".chat-widget--bubble").toggle(700);
          $(".icon-whahtsapp").toggle(500);
          $(".icon-whahtsapp").toggleClass('hide');          
        });

      });
    })(jQuery);

  }


 
  


}
