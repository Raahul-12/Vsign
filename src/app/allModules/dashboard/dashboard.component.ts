import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as Chart from 'chart.js';
import { Table } from '../dashboard/dashboard';
import { DashboardService } from '../dashboard/dashboard.service';
import 'chartjs-plugin-labels';
import { efficiencyChart } from '../dashboard/models/efficiencyChart.model';
import { processChart } from '../dashboard/models/processChart.model';
import { forkJoin, Observable } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
// export interface Table {
//   title: string;
//   author: string;
//   date: string;
//   signed: string;
//   completeby: string;
// }
// const array: Table[] = [
//   { title: 'Transport Contract', author: 'Raja M.', date: '14/08/2020', signed: 'User 1(1/3)', completeby: '14/08/2020' },
//   { title: 'Transport Contract', author: 'Raja M.', date: '14/08/2020', signed: 'User 1(1/3)', completeby: '14/08/2020' },
//   { title: 'Transport Contract', author: 'Raja M.', date: '14/08/2020', signed: 'User 1(1/3)', completeby: '14/08/2020' },
//   { title: 'Transport Contract', author: 'Raja M.', date: '14/08/2020', signed: 'User 1(1/3)', completeby: '14/08/2020' },
//   { title: 'Transport Contract', author: 'Raja M.', date: '14/08/2020', signed: 'User 1(1/3)', completeby: '14/08/2020' }
// ];
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  form: FormGroup;
  onallflag: boolean = false;
  oncreatedflag: boolean = false;
  onreleasedflag: boolean = false;
  onsigningflag: boolean = false;
  oncompletedflag: boolean = false;

  constructor(private router: Router, private service: DashboardService, private fb: FormBuilder, private datepipe: DatePipe) {
    this.form = this.fb.group({
      fromdate: [''],
      todate: ['']
    });
  }
  selected1 = 'option4';
  selected2 = 'option3';
  data: any[];
  i: number;
  // tslint:disable-next-line:variable-name
  data_arr = [];

  draftarray = [];
  releasedarray = [];
  signedarray = [];

  completedarray = [];
  labels = ['Created', 'Released', 'Signing', 'Completed'];
  chart;
  chart1;
  chart2;
  // employeesDataSource = array;
  data_arr1 = [];
  color_arr1 = [];
  data_arr2 = [];
  color_arr2 = [];
  eff_percentage = 45;
  process_percentage = 99;
  labels1 = ['Efficiency'];
  labels2 = ['Process'];
  client = "surya";
  company = "Exalca";
  employeesDataSource: MatTableDataSource<any>;
  efficiencyChartData: efficiencyChart;
  processChartData: processChart = new processChart();
  effi_percentage: number;
  signing_process: number;
  employeesDisplayColumns: string[] = ['title', 'referenceNo', 'author', 'date', 'fulfilment', 'signed', 'completeby', 'action'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // employeesList: Table[] = [];

  ngOnInit(): void {

    this.getAllDashBoardData().subscribe((x: any) => {

      this.efficiencyChartData = x[1];
      console.log(x[1]);
      this.effi_percentage = ((parseInt(this.efficiencyChartData.signedDocs) / (parseInt(this.efficiencyChartData.totalDocs)))) * 100;
      console.log(this.effi_percentage);


      for (let i = 1; i <= 100; i++) {
        this.data_arr1.push(1);
        if (i <= this.effi_percentage) {
          this.color_arr1.push('#ed6c7d');
        }
        else {

          this.color_arr1.push('#e5e5e5');
        }
      }

      this.chart1 = new Chart('canvas1', {
        type: 'doughnut',
        data: {
          labels: this.labels1,
          datasets: [
            {
              borderWidth: 1,
              data: this.data_arr1,
              backgroundColor: this.color_arr1,
              fill: true
            }
          ]
        },
        options: {

          cutoutPercentage: 88,
          plugins: {
            labels: false
          },

          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: false
            }],
            yAxes: [{
              display: false
            }],
          }
        }
      });
      this.processChartData = x[2];
      console.log(x[2]);
      this.signing_process = (parseInt(this.processChartData.released) / parseInt(this.processChartData.completed)) * 100;
      //  this.signing_process = (parseInt(thi))
      for (let i = 1; i <= 100; i++) {

        this.data_arr2.push(1);

        if (i <= this.signing_process) {
          this.color_arr2.push('#ed6c7d');
        }
        else {
          this.color_arr2.push('#e5e5e5');

        }
      }


      this.chart2 = new Chart('canvas2', {
        type: 'doughnut',
        data: {
          labels: this.labels2,
          datasets: [
            {
              borderWidth: 1,
              data: this.data_arr2,
              backgroundColor: this.color_arr2,
              fill: true
            }
          ]
        },
        options: {

          cutoutPercentage: 88,
          plugins: {
            labels: false
          },

          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: false
            }],
            yAxes: [{
              display: false
            }],
          }
        }
      });
      this.data_arr.push(parseInt(this.processChartData.draft))
      this.data_arr.push(parseInt(this.processChartData.released))
      this.data_arr.push(parseInt(this.processChartData.signing))
      this.data_arr.push(parseInt(this.processChartData.completed));
      this.chart = new Chart('canvas', {

        type: 'doughnut',
        data: {

          labels: this.labels,

          datasets: [
            {
              borderWidth: 0,
              data: this.data_arr,
              backgroundColor: [
                '#fb863a',
                '#40a8e2',
                '#485865',
                '#40ed9a'
              ],
              fill: true
            }
          ]
        },
        options: {
          responsive: false,

          cutoutPercentage: 78,
          plugins: {

            labels: {
              render: '%',
              fontColor: '#434343',
              fontSize: 8,
              fontWeight: 500,
              position: 'outside',
              textMargin: 6,

            }
          },

          legend: {
            position: 'left',
            labels: {
              usePointStyle: true,
            }
          },
          scales: {
            xAxes: [{
              display: false
            }],
            yAxes: [{
              display: false
            }],
          }
        }
      });
      this.employeesDataSource = new MatTableDataSource(x[0]);
      console.log("table", x[0]);



      this.employeesDataSource.sort = this.sort
      this.employeesDataSource.paginator = this.paginator;
    })








  }
  ondate() {
    if (this.onallflag == true) {
      this.getAllDashBoardData().subscribe((x: any) => {
        this.employeesDataSource = new MatTableDataSource(x[0]);
        this.employeesDataSource.sort = this.sort
        this.employeesDataSource.paginator = this.paginator;
        console.log(x);
      })

    }
    else if (this.oncreatedflag == true) {
      this.getAllDashBoardData().subscribe((x: any) => {
        console.log("new", x);

        for (this.i = 0; this.i < x[0].length; this.i++) {
          const draft: any = x[0][this.i].fulfilment == "Draft"
          if (draft) {

            this.draftarray.push(x[0][this.i]);
            this.employeesDataSource = new MatTableDataSource(this.draftarray);
            this.employeesDataSource.sort = this.sort
            this.employeesDataSource.paginator = this.paginator;
          }
        }
        console.log("newdata", this.draftarray);
        this.draftarray.pop();
      })
    }
    else if (this.onreleasedflag == true) {
      this.getAllDashBoardData().subscribe((x: any) => {
        for (this.i = 0; this.i < x[0].length; this.i++) {
          const released: any = x[0][this.i].fulfilment == "Released"
          if (released) {

            this.releasedarray.push(x[0][this.i]);
            this.employeesDataSource = new MatTableDataSource(this.releasedarray);
            this.employeesDataSource.sort = this.sort
            this.employeesDataSource.paginator = this.paginator;
          }
        }
        this.releasedarray.pop();
      })
    }
    else if (this.onsigningflag == true) {
      this.getAllDashBoardData().subscribe((x: any) => {
        for (this.i = 0; this.i < x[0].length; this.i++) {
          const signing: any = x[0][this.i].fulfilment == "In Signing"
          if (signing) {

            this.signedarray.push(x[0][this.i]);
            this.employeesDataSource = new MatTableDataSource(this.signedarray);
            this.employeesDataSource.sort = this.sort
            this.employeesDataSource.paginator = this.paginator;
          }

        }
        this.signedarray.pop();
      })
    }
    else if (this.oncompletedflag == true) {
      this.getAllDashBoardData().subscribe((x: any) => {
        for (this.i = 0; this.i < x[0].length; this.i++) {
          const completed: any = x[0][this.i].fulfilment == "Completed"
          if (completed) {

            this.completedarray.push(x[0][this.i]);
            this.employeesDataSource = new MatTableDataSource(this.completedarray);
            this.employeesDataSource.sort = this.sort
            this.employeesDataSource.paginator = this.paginator;
          }

        }
        this.completedarray.pop();
      })
    }
    const fromdate = this.form.get('fromdate').value;
    const todate = this.form.get('todate').value;
    console.log(this.form.value);
    const fromdate_filter = this.datepipe.transform(fromdate, 'yyyy-mm-dd');
    const todate_filter = this.datepipe.transform(todate, 'yyyy-mm-dd');
    console.log(fromdate_filter);
    console.log(todate_filter);
    if (fromdate_filter != null && todate_filter != null) {
      this.service.getbydate(fromdate_filter, todate_filter).subscribe((data) => {
        this.employeesDataSource = new MatTableDataSource(data);
      })
    }
    else if (fromdate_filter != null) {
      this.service.getbyfromdate(fromdate_filter).subscribe((data) => {
        this.employeesDataSource = new MatTableDataSource(data);
      })
    }
    else if (fromdate_filter != null) {
      this.service.getbytodate(fromdate_filter).subscribe((data) => {
        this.employeesDataSource = new MatTableDataSource(data);
      })
    }
  }
  oncreated() {
    // this.getAllDashBoardData().subscribe((x: any) => {

    //   this.efficiencyChartData = x[1];
    //   console.log(x[1]);
    // )}
    this.oncreatedflag = true;

    this.onallflag = true;
    this.oncompletedflag = false;
    this.onreleasedflag = false;
    this.onsigningflag = false;

    // this.getAllDashBoardData().subscribe((x: any) => {
    //   console.log("new", x);

    //   for (this.i = 0; this.i < x[0].length; this.i++) {
    //     const draft: any = x[0][this.i].fulfilment == "Draft"
    //     if (draft) {

    //       this.draftarray.push(x[0][this.i]);
    //       this.employeesDataSource = new MatTableDataSource(this.draftarray);
    //       this.employeesDataSource.sort = this.sort
    //       this.employeesDataSource.paginator = this.paginator;
    //     }
    //   }
    //   console.log("newdata", this.draftarray);
    //   this.draftarray.pop();
    // })
  }
  onall() {
    this.onallflag = true;
    this.oncompletedflag = false;
    this.onreleasedflag = false;
    this.onsigningflag = false;
    this.oncreatedflag = false;
    //   this.getAllDashBoardData().subscribe((x: any) => {
    //     this.employeesDataSource = new MatTableDataSource(x[0]);
    //     this.employeesDataSource.sort = this.sort
    //     this.employeesDataSource.paginator = this.paginator;
    //     console.log(x);
    //   })
  }
  onreleased() {
    this.onreleasedflag = true;

    this.onallflag = true;
    this.oncompletedflag = false;

    this.onsigningflag = false;
    this.oncreatedflag = false;
    // this.getAllDashBoardData().subscribe((x: any) => {
    //   for (this.i = 0; this.i < x[0].length; this.i++) {
    //     const released: any = x[0][this.i].fulfilment == "Released"
    //     if (released) {

    //       this.releasedarray.push(x[0][this.i]);
    //       this.employeesDataSource = new MatTableDataSource(this.releasedarray);
    //       this.employeesDataSource.sort = this.sort
    //       this.employeesDataSource.paginator = this.paginator;
    //     }
    //   }
    //   this.releasedarray.pop();
    // })
  }
  onsigning() {
    this.onsigningflag = true;

    this.onallflag = true;
    this.oncompletedflag = false;
    this.onreleasedflag = false;

    this.oncreatedflag = false;
    // this.getAllDashBoardData().subscribe((x: any) => {
    //   for (this.i = 0; this.i < x[0].length; this.i++) {
    //     const signing: any = x[0][this.i].fulfilment == "In Signing"
    //     if (signing) {

    //       this.signedarray.push(x[0][this.i]);
    //       this.employeesDataSource = new MatTableDataSource(this.signedarray);
    //       this.employeesDataSource.sort = this.sort
    //       this.employeesDataSource.paginator = this.paginator;
    //     }

    //   }
    //   this.signedarray.pop();
    // })
  }
  oncompleted() {
    this.oncompletedflag = true;

    this.onallflag = true;

    this.onreleasedflag = false;
    this.onsigningflag = false;
    this.oncreatedflag = false;
    // this.getAllDashBoardData().subscribe((x: any) => {
    //   for (this.i = 0; this.i < x[0].length; this.i++) {
    //     const completed: any = x[0][this.i].fulfilment == "Completed"
    //     if (completed) {

    //       this.completedarray.push(x[0][this.i]);
    //       this.employeesDataSource = new MatTableDataSource(this.completedarray);
    //       this.employeesDataSource.sort = this.sort
    //       this.employeesDataSource.paginator = this.paginator;
    //     }

    //   }
    //   this.completedarray.pop();
    // })
  }
  getAllDashBoardData(): Observable<any> {
    return forkJoin([this.service.getTableContents(this.client, this.company), this.service.getKPI(this.client, this.company), this.service.getProgress(this.client, this.company)]);
  }
  sign(client, company, docId) {

    // client = x[0][0].client;
    // company = x[0][0].company;
    // docId = x[0][0].docId;
    console.log(client);
    localStorage.removeItem('completeclient');
    localStorage.removeItem('completecompany');
    localStorage.removeItem('completedocId');
    localStorage.setItem("Selectedclient", client);
    localStorage.setItem("Selectedcompany", company);
    localStorage.setItem("SelecteddocId", docId);
    this.router.navigate(['signDoc']);
  }

  view(client, company, docId) {

    // client = x[0][0].client;
    // company = x[0][0].company;
    // docId = x[0][0].docId;
    console.log(client);
    localStorage.removeItem("Selectedclient");
    localStorage.removeItem("Selectedcompany");
    localStorage.removeItem("SelecteddocId");
    localStorage.setItem("completeclient", client);
    localStorage.setItem("completecompany", company);
    localStorage.setItem("completedocId", docId);
    this.router.navigate(['signDoc']);
  }

  applyfilter(filterValue: string): void {
    this.employeesDataSource.filter = filterValue.trim().toLowerCase();
  }
  // tslint:disable-next-line:typedef
  addbutton() {
    this.router.navigate(['createDoc']);
  }

}
