import { Component, OnInit, Output } from '@angular/core';
import { HTTPMainServiceService } from "../../core/services/httpmain-service.service";
@Component({
  selector: 'app-main-categories',
  templateUrl: './main-categories.component.html',
  styleUrls: ['./main-categories.component.css']
})
export class MainCategoriesComponent implements OnInit {

  constructor(private http:HTTPMainServiceService) { }
   public categoriesList
   public filteredCategoriesList
 
  ngOnInit(): void {
    this.http.GET(`Group/getGroup`).subscribe(data=>{
          this.filteredCategoriesList=this.categoriesList=data.map((el)=>{
          return {name:el.text,subCategories:el.requestTypes.map((el2)=>{return el2.text})}

          });
    })
  }
   filter($event)
   {
     
     if($event.target.value==="")
     {
         this.categoriesList=this.filteredCategoriesList
     }
     this.filteredCategoriesList=this.categoriesList;
        this.categoriesList=this.categoriesList.filter(el=>{console.log(el.subCategories) ;return el.name.toLowerCase().includes($event.target.value.toLowerCase())})
   }

}
