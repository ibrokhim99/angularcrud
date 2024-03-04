import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog"
import { AddtaskComponent } from '../addtask/addtask.component';
import { Store } from '@ngrx/store';
import { Tasks } from 'src/app/Store/Model/Task.model';
import { gettasklist } from 'src/app/Store/Task/Task.Selectors';
import { addtask, deleteetask, gettask, loadtask, openpopup } from 'src/app/Store/Task/Task.Action';
import { MatTableDataSource } from "@angular/material/table"
import { MatPaginator } from "@angular/material/paginator"
import { MatSort } from "@angular/material/sort"

@Component({
  selector: 'app-tasklisting',
  templateUrl: './tasklisting.component.html',
  styleUrls: ['./tasklisting.component.css']
})
export class TasklistingComponent implements OnInit {

  Tasklist!: Tasks[];
  datasource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColums: string[] = [ "name",  "address", "type", "taskname", "action"]

  constructor(private dialog: MatDialog, private store: Store) {

  }
  ngOnInit(): void {
    this.store.dispatch(loadtask());
    this.store.select(gettasklist).subscribe(item => {
     
      
      this.Tasklist = item;
      this.datasource = new MatTableDataSource<Tasks>(this.Tasklist);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    });
  }

  FunctionAdd() {
    this.OpenPopup(0, 'Create task');
  }
  FunctionEdit(code:any){
   console.log(code)
   
    this.store.dispatch(gettask({ id: code }))
    this.OpenPopup(code, 'Update task');
  
  }

  FunctionDelete(code:any){
    
    console.log(code)
    
    if(confirm('do you want to remove?')){
      
      
      this.store.dispatch(deleteetask({ code: code }));
    }
  }

  OpenPopup(code: any, title: string) {
    this.store.dispatch(openpopup());
    this.dialog.open(AddtaskComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        code: code,
        title: title
      }
    })

  }

}
