import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms"
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"
import { Store } from '@ngrx/store';
import { addtask, updatetask } from 'src/app/Store/Task/Task.Action';
import { gettask } from 'src/app/Store/Task/Task.Selectors';
import {Tasks } from 'src/app/Store/Model/Task.model';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {
  title = 'Create Task'
  isedit = false;
  dialogdata: any;
 

  constructor(private builder: FormBuilder, private ref: MatDialogRef<AddtaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private store: Store) {

  }
  ngOnInit(): void {
    this.dialogdata = this.data;
    this.title = this.dialogdata.title;
    this.store.select(gettask).subscribe(res => {
      this.taskform.setValue({
        id: res.id, name: res.name, 
        address: res.address, taskname: res.taskname, type: res.type, status: res.status
      })
    })
  
    
    
  }

  ClosePopup() {
    this.ref.close();
  }



  taskform = this.builder.group({
    id: this.builder.control(0),
    name: this.builder.control('', Validators.required),
    address: this.builder.control('', Validators.required),
    type: this.builder.control('HARD'),
    taskname: this.builder.control(''),
    status: this.builder.control(true)
  } 
  )


    generateNewId(): number {

    return Math.floor((Math.random()*6)+1);
  }
  SaveTask() {
    if (this.taskform.valid) {
      const _obj: Tasks = {
        id: this.taskform.value.id as any,
        name: this.taskform.value.name as string,
        taskname: this.taskform.value.taskname as string,
        address: this.taskform.value.address as string,
        type: this.taskform.value.type as string,
        status: this.taskform.value.status as boolean
      }
      if (!_obj.id || _obj.id === 0) {
        
        _obj.id = this.generateNewId();
        this.store.dispatch(addtask({ inputdata: _obj }));
      } else {
        this.store.dispatch(updatetask({ inputdata: _obj }));
      }
      this.ClosePopup();
      this.store.dispatch(addtask({ inputdata: _obj }));
    }
  }



}
