import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserGroupService } from "../../core/services/user-group.service";
import {Router} from '@angular/router';
@Component({
  selector: 'app-group-category',
  templateUrl: './group-category.component.html',
  styleUrls: ['./group-category.component.css']
})
export class GroupCategoryComponent implements OnInit {
public categoriesList
   public name;
  constructor( private route: ActivatedRoute,private http:UserGroupService,private router:Router) { 



  }

  ngOnInit(): void {
        const routeParams = this.route.snapshot.paramMap;
    const GroupId = Number(routeParams.get('id'));
    this.http.getData().subscribe(data=>{
      this.name=data.find(el => el.id === GroupId).text
    this.categoriesList=data.find(el => el.id === GroupId).requestTypes.map((el)=>{
     console.log(el);     return {id:el.id,name:el.text,icon:el.icon,ticketType:el.ticketType,description:el.description}

          });
    })

  }
 add(GroupID)
   {
        console.log(GroupID)
        this.router.navigate(["/user/helpCenter/create",GroupID]);
   }
}
