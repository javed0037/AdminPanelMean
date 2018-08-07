import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewRef } from '@angular/core';
import { CommonService } from '../../../../shared/services/common.service';
import { HttpClient } from '@angular/common/http';

import { Chart } from 'chart.js';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-dash-main',
  templateUrl: './dash-main.component.html',
  styleUrls: ['./dash-main.component.scss']
})
export class DashMainComponent implements OnInit, AfterViewInit {
  totalData: any;
  adminData: any;
  environment = environment;
  constructor(
    private commonService: CommonService,
    private http: HttpClient,
    private _auth: AuthService
  ) { }

  dataCount;

  ngOnInit() {
    
    let user = this._auth.getLoginUser();

    this.http.post('likeMinded/getAdminProfile', {adminId: user._id})
    .subscribe(response => {
      console.log(response);
      if(response) {
        this.adminData = response['data'];
        this.manageCharts();
      } else {
        this.commonService.toggleSnackBar();
      }
    }, error =>  {
      console.log(' Error => ', error);
      this.commonService.toggleSnackBar()
    })
  }

  ngAfterViewInit() {
    // this.manageCharts()
  }

  manageCharts() {

    let userChart = this.initChart(this.adminData.usersMonthCount, 'Users', 'userChart' );
    let restuarantChart = this.initChart(this.adminData.restuarantsMonthCount, 'Restuarants', 'restuarantChart' );
    // let providerChart = this.initChart(this.adminData.providersMonthCount, 'Providers', 'providerChart' );
    
  }

  initChart(usersData, label, chartSelector) {
    var ctx = document.getElementById(chartSelector);
    var chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: usersData.month_arr,
        datasets: [{
          label: `# of ${label}`,
          data: usersData.count_arr,
        }]
      }
    })
    return chart;
  }

}
