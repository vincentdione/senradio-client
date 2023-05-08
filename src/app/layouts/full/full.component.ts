import { UserService } from 'src/app/services/user.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, AfterViewInit } from '@angular/core';


/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnDestroy, AfterViewInit {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  userId : any
  user : any
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,private userService:UserService
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }


  ngOnInit(): void {
    this.userId = localStorage.getItem("userId")
    this.getUser()
    }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit() { }

  getUser(){
    this.userService.getOne(this.userId).subscribe((res:any)=>{
        this.user = res
        console.log(this.user)
    },(err:any)=>{
      console.log(err)
    })
  }

}
