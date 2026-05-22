const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
app.use(express.json());

const filePath = path.join(__dirname,"todo.json");

//read the todos from the file 
function readTodos(){
    if(!fs.existsSync(filePath)){
        return [];
    }
    const data = fs.readFileSync(filePath,"utf-8");
    if(data==""){
        return [];
    }
    else{
        //data is returned in the form of an object
        return JSON.parse(data);
    }
    
}

//save the todos/write the todos to a file
function saveTodos(todos){
    fs.writeFileSync(filePath,JSON.stringify(todos,null,2));
}


//to read todos from the file 
app.get("/todos",(req,res)=>{
    const data = readTodos();
    if(!data){
        res.status(404).json({message : "Todo not found!"});
    }
    else{
        res.status(200).json(data);
    }
})


//to add a todo to the file 
app.post("/todos",(req,res)=>{
    const task = req.body.task ; 
    const data = readTodos();
    const id = data.length + 1;
    const todo = {
        id : id,
        task : task,
        done : false
    }
    data.push(todo);
    saveTodos(data);
    res.json(todo);
})


//to delete a todo from the file 
app.delete("/todos/:id",(req,res)=>{
    let id = parseInt(req.params.id);
    let todos = readTodos();
    let todo = todos.find((todo)=>{
        return todo.id===id
    })
    if(!todo){
        res.status(404).json({message : "Todo not found!"});
    }
    else{
        let newTodos = todos.filter((todo)=>{
            return todo.id!=id
        })
        saveTodos(newTodos);
        res.status(200).json({message : "Todo deleted"});
    }
})


//to mark a todo as done 
app.put("/todos/:id",(req,res)=>{
    let id = parseInt(req.params.id);
    let todos = readTodos();
    let todo = todos.find((todo)=>{
        return todo.id===id
    })
    if(!todo){
        res.status(404).json({message : "No such todo found!"});
    }
    else{
        todos.forEach((todo)=>{
            if(todo.id===id){
                todo.done = true;
            }
        })
        saveTodos(todos);
        res.json({message : "Marked as done!"});
        
    }
})


app.listen(3000,()=>{
    console.log("Server is listening on port 3000");
})