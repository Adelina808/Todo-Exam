namespace TODO{
    type GetTodoRes=ITodo[]
    type GetTodoReq=void

    type PostTodoRes=ITodo[]
    type PostTodoReq=ITodo

    type PatchTodoRes=ITodo[]
    type PatchTodoReq={
        _id:number,
        data:ITodo
    }

    type DeleteTodoRes=ITodo[]
    type DeleteTodoReq=number

    type DeleteTodosRes=[]
    type DeleteTodosReq=void
}