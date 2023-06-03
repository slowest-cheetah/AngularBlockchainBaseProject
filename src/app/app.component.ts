import { Component, OnInit } from '@angular/core';

declare let window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'DesireDome';

  constructor(){}

  ngOnInit(): void {
   
  }

}
