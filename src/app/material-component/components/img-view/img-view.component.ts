import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-img-view',
  templateUrl: './img-view.component.html',
  styleUrls: ['./img-view.component.scss']
})
export class ImgViewComponent implements OnInit {

  onView= new EventEmitter();

  img : any
  constructor(  private dialogRef: MatDialogRef<ImgViewComponent>, @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    this.img = dialogData.data;

    console.log(this.img)

  }

  ngOnInit(): void {
  }

}
