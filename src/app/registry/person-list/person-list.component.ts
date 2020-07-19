import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { MatTableDataSource } from '@angular/material/table';
import { RestfulService } from './../../services/restful.service';

export interface PERSON_TYPE {
  id: number;
  type: string;
}

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  personTypes: PERSON_TYPE[];

  constructor(private router: Router, private route: ActivatedRoute, private restService: RestfulService) { }

  ngOnInit() {
    this.getPersonAll();
    this.getPersonTypes();
  }

  //====== Person List ======//
  //#1. Define variables
  displayedColumn: string[] = ['firstName','lastName','ssn','birthDay','personType','phone','delete'];
  dataSource = new MatTableDataSource();

  //#2. Get data from Rest
  getPersonAll() {
    this.restService.getPersonAllData()
    .subscribe(
      data => { 
        this.dataSource.data = data;
      },
      err => {
        console.log("Error occured: getPersonAll()" + err)
      }
    );
  }

  //#3. Filter
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }  

  getPersonTypes() {
    this.restService.getPersonTypeData()
    .subscribe(
      data => { 
        this.personTypes = data;
        //console.log("data=="+data)
      },
      err => {
        console.log("Error occured: getPersonDeital()" + err)
      }
    );
  }

  onClickDelete(id: string) {
    console.log("delete id: "+id)
    this.restService.deletePerson(id)
    .subscribe(
      data => { 
        this.getPersonAll();
        this.getPersonTypes();
      },
      err => {
        console.log("Error occured: getPersonDeital()" + err)
      }
    );
  }

}
