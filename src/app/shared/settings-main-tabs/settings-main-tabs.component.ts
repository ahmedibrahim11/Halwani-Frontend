import { Component, OnInit } from '@angular/core';
import { TabscreationService } from 'src/app/core/services/tabscreation.service';

@Component({
  selector: 'app-settings-main-tabs',
  templateUrl: './settings-main-tabs.component.html',
  styleUrls: ['./settings-main-tabs.component.css'],
})
export class SettingsMainTabsComponent implements OnInit {
  constructor(private tabs: TabscreationService) {}

  ngOnInit(): void {}
  public SelectedTabIndex = 0;

  tabIndex: number = 0;
  onTabChanged(e: any) {
    this.tabIndex = e.index;

    switch (e.index) {
      case 1:
        this.tabs.setTabValue('HelpCenter');
        break;
      case 2:
        this.tabs.setTabValue('SLA');
        break;
      case 3:
        this.tabs.setTabValue('PortalGroups');
        break;
      case 4:
        this.tabs.setTabValue('Categorization');
        break;
      case 5:
        this.tabs.setTabValue('User');
        break;
      default:
        this.tabs.setTabValue(undefined);
    }
  }
}
