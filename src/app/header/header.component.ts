import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataShareService } from './../services/data-share.service';


//export let browserRefresh = false;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuDisplay: boolean;
  subscription: Subscription;
  constructor(private router: Router, 
              private dataShareService: DataShareService) { 
     /*
      this.subscription = router.events.subscribe((event) => {
          if (event instanceof NavigationStart) {
              browserRefresh = !router.navigated;
              console.log("refresh=="+!router.navigated)
          }
      });
    */     
  }

  ngOnInit() {
    
    if (sessionStorage.getItem('login') === 'true')
        this.menuDisplay = true;
    if (sessionStorage.getItem('login') === 'false')
        this.menuDisplay = false;

    this.dataShareService.loginFlag.subscribe(value => {
      if (value !='') {
        sessionStorage.setItem('login', value);
         if (value === 'true')
             this.menuDisplay = true;
         if (value === 'false')
             this.menuDisplay = false;
         console.log("reSet value=="+value);
      }
    })

  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
   // console.log("33333==="+browserRefresh);
  }

  private isPageRefresh(router: Router) : boolean {
    let browserRefresh: boolean = false;
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
          browserRefresh = !router.navigated;
          console.log("return=="+!router.navigated)
      }
    });

    return browserRefresh;
  }
}
