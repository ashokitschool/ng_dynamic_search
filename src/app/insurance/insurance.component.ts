import { Component, OnInit } from '@angular/core';
import { InsuranceService } from '../insurance.service';
import { Searchrequest } from '../searchrequest';
import { Searchresponse } from '../searchresponse';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {

  //injecting service object into compoinent (DI)
  constructor(private insuranceService : InsuranceService) { }

  public planNames: string[] | undefined ;
  public planStatuses : any;

  //these variables for form-binding
  public selectedPlan = "select";
  public selectedStatus = "select";

  //to bind input data & output data
  searchRequest : Searchrequest = new Searchrequest();
  searchResponse : Searchresponse[] = [];

  ngOnInit(): void {
    this.getPlanNames();
    this.getPlanStatus();
  }

  //calling service layer method for first drop down data
  getPlanNames(){
    this.insuranceService.getPlanNames().subscribe(data => {
      this.planNames = data;
    });
  }

  //calling service layer method for second drop down data
  getPlanStatus(){
    this.insuranceService.getPlanStatus().subscribe(data => {
      this.planStatuses = data;
    });
  }

  search(){
    //storing form data into request object
    this.searchRequest.planName = this.selectedPlan;
    this.searchRequest.planStatus = this.selectedStatus;
   
    //calling service layer method with search request obj to get response
    this.insuranceService.search(this.searchRequest).subscribe(data => {
          this.searchResponse = data;
    });
  }

  onSubmit() {
    this.search();
  }

  exportToExcel() {
    this.insuranceService.getExcel().subscribe(data => {
      let file = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  exportToPdf() {
    this.insuranceService.getPdf().subscribe(data => {
      let file = new Blob([data], { type: 'application/pdf' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

}