import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-card-body',
  templateUrl: './main-card-body.component.html',
  styleUrls: ['./main-card-body.component.css']
})
export class MainCardBodyComponent implements OnInit {
public SelectedTabIndex = 0;
 empty:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

}
