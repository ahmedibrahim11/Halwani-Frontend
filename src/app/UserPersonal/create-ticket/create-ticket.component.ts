import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
     private typeID:Number
  ngOnInit(): void {
   const routeParams = this.route.snapshot.paramMap;
    this.typeID = Number(routeParams.get('id'));
  }

}
