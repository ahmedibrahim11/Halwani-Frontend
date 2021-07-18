import { Component, OnInit, Output } from '@angular/core';
import { UserGroupService } from '../../core/services/user-group.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main-categories',
  templateUrl: './main-categories.component.html',
  styleUrls: ['./main-categories.component.css'],
})
export class MainCategoriesComponent implements OnInit {
  constructor(private http: UserGroupService, private router: Router) {}
  public categoriesList;
  public filteredCategoriesList;

  ngOnInit(): void {
    this.http.getData().subscribe((data) => {
      this.filteredCategoriesList = this.categoriesList = data.map((el) => {
        return {
          id: el.id,
          name: el.text,
          subCategories: el.requestTypes.map((el2) => {
            return el2.text;
          }),
        };
      });
    });
  }
  filter(event) {
    if (this.categoriesList === '') {
      this.categoriesList = this.filteredCategoriesList;
    }
    this.categoriesList = this.filteredCategoriesList.filter((el) => {
      return el.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
  }
  goToDetails(GroupID) {
    console.log(GroupID);
    this.router.navigate(['/user/helpCenter/groupdetails', GroupID]);
  }
}
