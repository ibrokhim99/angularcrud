export interface Tasks{
    id:any,
    name:string,
    type:string,
    address:string,
    taskname:string,
    status:boolean
}

export interface TaskModel{
    list:Tasks[],
    taskobj:Tasks,
    errormessage:string
}