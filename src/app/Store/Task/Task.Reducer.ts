import { createReducer, on } from "@ngrx/store";
import { TaskState } from "./Task.State";
import { addtasksuccess, deletetasksuccess, gettasksuccess, loadtaskfail, loadtasksuccess, openpopup, updatetasksuccess } from "./Task.Action";
import { TaskModel } from "../Model/Task.model";

const _TaskReducer = createReducer(TaskState,
    on(loadtasksuccess, (state, action) => {
        return {
            ...state,
            list: [...action.list],
            errormessage: ''
        }
    }),
    on(gettasksuccess, (state, action) => {
        return {
            ...state,
            taskobj: action.obj,
            errormessage: ''
        }
    }),
    on(loadtaskfail, (state, action) => {
        return {
            ...state,
            list: [],
            errormessage: action.errormessage
        }
    }),
    on(addtasksuccess, (state, action) => {
        const maxId = Math.max(...state.list.map(o => Number(o.id)), 0) + 1; 
        const newdata = { ...action.inputdata, id: `${maxId}` };    
        return {
            ...state,
            list: [...state.list, newdata],
            errormessage: ''
        };
    }),
    on(updatetasksuccess, (state, action) => {
        const _newdata = state.list.map(o => {
            return o.id === action.inputdata.id ? action.inputdata : o
        })
        return {
            ...state,
            list: _newdata,
            errormessage: ''
        }
    }),
    on(deletetasksuccess, (state, action) => {
        
        
        const _newdata = state.list.filter(o=>o.id !== action.code);
        return {
            ...state,
            list: _newdata,
            errormessage: ''
        }
    }),
    on(openpopup, (state) => {
        return {
            ...state,
            taskobj: {
                id: "",
                name: "",
                
                type: "HARD",
                address: "",
                taskname: "",
                status: true
            }
        }
    })
)

export function TaskReducer(state: TaskModel | undefined , action: any) {
   
    
    return _TaskReducer(state, action);
}