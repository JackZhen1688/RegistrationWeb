import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { DataShareService } from './../../services/data-share.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,
              private dataShareService: DataShareService) {}

  ngOnInit() {

    this.dataShareService.isLogin.next(false);
    this.dataShareService.loginFlag.next('false');
  }

}
