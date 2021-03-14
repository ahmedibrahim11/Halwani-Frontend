import { Component, OnInit } from '@angular/core';
import { FormBuilder ,FormGroup, Validators} from '@angular/forms';
import { createTicketDTO } from "../DTOs/createTicketDTO";
@Component({
  selector: 'app-create-ticket-popup',
  templateUrl: './create-ticket-popup.component.html',
  styleUrls: ['./create-ticket-popup.component.css']
})
export class CreateTicketPopupComponent implements OnInit {

  createTicketDTO: createTicketDTO = new createTicketDTO();
  createTicketDTOFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
     this.createTicketDTOFormGroup = this.formBuilder.group({

      
      ticketType: ['', [Validators.required]],
      summary: ['', [Validators.required]],
      attachments:[''],
      description:[''],
      reporter:['', [Validators.required]],
      source:['', [Validators.required]],
      sevirity:['',[Validators.required]],
      priority:['',[Validators.required]],
      productCategoryName1:[''],
      productCategoryName2:[''],
    });
  }
  submiCreate(){
console.log(this.createTicketDTOFormGroup.value );
  }

  uploadAll(){
    console.log("Filesssss")
  }

}
