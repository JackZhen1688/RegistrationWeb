import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl} from '@angular/forms';
import { RestfulService } from './.././../services/restful.service'
import { matchValues } from './../../directives/match-values'

export interface PERSON_TYPE {
  id: number;
  type: string;
}
export interface PHONE_TYPE {
  id: number;
  type: string;
}

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {

  durationInSeconds = 5;
  updateFlag:boolean = false;

  personTypes: PERSON_TYPE[];
  phoneTypes: PHONE_TYPE[]

  detailForm: FormGroup;
  
  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder, 
              private _snackBar: MatSnackBar,
              private restService: RestfulService) { }


  ngOnInit() {
    //console.log("### inside detail sessionStorage==="+sessionStorage.getItem('login'))
    this.constructDetailForm();
    this.getPersonTypes()
    this.getPhoneTypes()
    if (this.getSSN() != null) {
        this.getPersonDetail(this.getSSN());
        this.updateFlag=true;
    }
  }

  constructDetailForm()
  {
    this.detailForm = this.formBuilder.group({
      id: this.formBuilder.control(''),
      userId: this.formBuilder.control('', [Validators.required]),
      password: this.formBuilder.control('', [Validators.required]),
      confirmPassword: this.formBuilder.control('',[matchValues('password')]),
      pertId: this.formBuilder.control(''),
      address: this.formBuilder.group({
        id: this.formBuilder.control(''),
        street: this.formBuilder.control(''),
        city: this.formBuilder.control(''),
        state: this.formBuilder.control(''),
        zip: this.formBuilder.control(''),
      }),
      firstName: this.formBuilder.control(''),
      lastName: this.formBuilder.control(''),
      ssn: this.formBuilder.control('', [Validators.required]),
      birthDay: this.formBuilder.control(new Date()), //new Date()
      emgContact: this.formBuilder.group({
          id: this.formBuilder.control(''),
          contactName: this.formBuilder.control(''),
          contactRelation: this.formBuilder.control(''),
          contactPhone: this.formBuilder.control(''),
          contactEmail: this.formBuilder.control('',[Validators.email] ),
        }),

      phones: this.constructPhoneArray(),

    });
  }

  constructPhoneArray() 
  {
    var formArray = this.formBuilder.array([]);
    if (this.getSSN() == null) {
        formArray.push(this.formBuilder.group({
          id: [''],
          phone: [''],
          phoneType: [''],
        }));
    }
    return formArray;
  }
  
  loadDetailForm(data: any) 
  { //#1. Initial Detail Fields
    this.detailForm.patchValue({
      'id': data.id,
      'userId': data.userId,
      'password': data.password,
      'confirmPassword': data.password,
      'pertId': data.pertId,
      'address': {
        'id': data.address.id,
        'street': data.address.street,
        'city': data.address.city,
        'state': data.address.state,
        'zip': data.address.zip,
       },
      'firstName': data.firstName,
      'lastName': data.lastName,
      'ssn': data.ssn,
      'birthDay': formatDate(data.birthDay, 'yyyy-MM-ddT00:00:00', 'en-US'),
      'emgContact': {
          'id': data.emgContact.id,
          'contactName': data.emgContact.contactName,
          'contactRelation': data.emgContact.contactRelation,
          'contactPhone': data.emgContact.contactPhone,
          'contactEmail': data.emgContact.contactEmail,
      }
    }); 
    //#2. Initial FormArray Fields
    data.phones.forEach(item => {
      const phone = this.formBuilder.group({ 
        'id': item.id,
        'phone': item.phone,
        'phoneType': item.phoneType,
      })
      this.phones.push(phone);
    });
  }

  serializedDate = new FormControl((new Date()).toISOString());

  get userId() {
    return this.detailForm.get('userId');
  }
  get password() {
    return this.detailForm.get('password');
  }
  get confirmPassword() {
     return this.detailForm.get('confirmPassword');
  }
  get birthDay() {
    return this.detailForm.get('birthDay');
  }
  get ssn() {
    return this.detailForm.get('ssn');
  }

  get contactEmail() {
    return this.detailForm.get("emgContact").get('contactEmail');
  }

  getPersonDetail(id: any) {
    this.restService.getPersonDetailData(id)
    .subscribe(
      data => { 
          this.loadDetailForm(data);
      },
      err => {
      }
    );
  }

  getSSN() {
    return this.route.snapshot.paramMap.get('ssn');
  }

  getPersonTypes() {
    this.restService.getPersonTypeData()
    .subscribe(
      data => { 
        this.personTypes = data;
      },
      err => {
        console.log("Error occured: getPersonDeital()" + err)
      }
    );
  }

  getPhoneTypes() {
    this.restService.getPhoneTypeData()
    .subscribe(
      data => { 
        this.phoneTypes = data;
      },
      err => {
        console.log("Error occured: getPersonDeital()" + err)
      }
    );
  }

  onChangePersonType(event: any) {
    //console.log("Value==="+event.value)
    this.restService.getPersonTypeId(event.value)
    .subscribe(
        data => { 
          this.detailForm.get('personType').get("id").setValue(data.id)
        },
        err => {
          console.log("Error occured: getPersonDeital()" + err)
        }
    );
  }

  onDateChange(event: any, component: any) {
    this.detailForm.get(component).setValue(formatDate(event.target.value, 'MM/dd/yyyy', 'en-US'));
  }  
/*-------------------
  Adding Phone 
  --------------------*/
  get phones() {
    return this.detailForm.get('phones') as FormArray
  }

  addPhone() {
    const phone = this.formBuilder.group({ 
      phone: [],
      phoneType: [],
    })
    this.phones.push(phone);
  }

  delPhone(i: any) {
    this.phones.removeAt(i);
  }

  onSubmit() {
    console.log("Form Value: "+JSON.stringify(this.detailForm.value));
    this.postPerson(this.detailForm.value);
  }

  postPerson(formValue: any) {
    this.restService.postPerson(formValue)
    .subscribe(
      data  => {
         if (data) {
            this._snackBar.open("Person data has been saved successfully!", 'close',  {
              duration: this.durationInSeconds * 1000,
              panelClass: ['mat-toolbar', 'mat-primary'] // 'mat-accent' or 'mat-warn'
            });
         } else {
            this._snackBar.open("Person data has been saved successfully!", 'close',  {
              duration: this.durationInSeconds * 1000,
              panelClass: ['mat-toolbar', 'mat-warn'] // 'mat-accent' or 'mat-warn'
            });
         }
         console.log("POST Request is successful ", data);
      },
      error  => {
        console.log("Error postPerson()", error);
      }
    );  
  }

  formReset() { 
    this.detailForm.reset();
    while (this.phones.length !== 0) {
      this.phones.removeAt(0)
    }
    this.getPersonDetail(this.getSSN());
  }

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }
}
