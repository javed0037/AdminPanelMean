import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonService } from '../../services/common.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  toggle = 0;
  constructor(
    public authService: AuthService,
    public commonService: CommonService
  ) { }

  adminData;
  environment = environment;
  
  ngOnInit() {
    if(localStorage.adminData)
    
      this.adminData = JSON.parse(localStorage.adminData);
  }

  sidebarCollapsed() {
    document.getElementById("bodySidebar").classList.toggle("layout-sidebar-collapsed");
    document.getElementById("sidebarWrap").classList.toggle("collapsed");
  }

}
