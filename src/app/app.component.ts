import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'businessmanager';
  constructor(
  ){}

  ngDoCheck(): void {
  }

  extendMenu(){
    $('.menuExtend').slideToggle();

    if($('#buttonMenu').attr('class')){
      $('#buttonMenu').removeClass('expand')
    }else {
      $('#buttonMenu').addClass('expand')
    }

  }


}
