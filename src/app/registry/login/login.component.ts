import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RestfulService } from './.././../services/restful.service';
import { DataShareService } from './../../services/data-share.service';
import { MethodService } from './../../services/method.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private dataShareService: DataShareService,
              private restService: RestfulService,
              private methodsService: MethodService) { }

  ngOnInit() {

    this.constructLoginForm();
  }

  constructLoginForm() {
    this.loginForm = this.formBuilder.group({
      userId: this.formBuilder.control('', [Validators.required]),
      password: this.formBuilder.control('', [Validators.required]),
      //password1: this.formBuilder.control(''),
    });
  }

  //get passwordInput() { return this.loginForm.get('password'); }  
  get userId() { 
    return this.loginForm.get('userId'); 
  }  

  get password() { 
    return this.loginForm.get('password'); 
  }  

  getPersonByUidandPwd(uid: any, pwd: any) {
    this.restService.getPersonByUidandPwd(uid, pwd)
    .subscribe(
      data => { 
        console.log("data=="+JSON.stringify(data));
        if (data.ssn === null || data.ssn ==="")
            this.methodsService.openMegsDialog("500px", "Login Failure!")
        else {
            this.dataShareService.loginFlag.next('true')
            this.router.navigate(['personList']);
        }
      },
      err => {
        console.log("Error occured: getPersonByUidandPwd()")
      }
    );
  }

  /*
  getPersonByUidandPwd(uid: any, pwd: any) {
   
    this.dataShareService.isLogin.next(true);
    this.dataShareService.loginFlag.next('true')
  }*/

  onSubmit() {
    console.log("Form Value: "+JSON.stringify(this.loginForm.value));
    
    this.getPersonByUidandPwd(this.userId.value, this.password.value);

  }

}
