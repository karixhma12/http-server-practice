const express = require("express");

const app = express();

app.use(express.json());

let todos = [
    {id:1 , task : "Learn Node.js" , done : false},
    {id:2 , task : "Learn HTTP" , done : false}
]

app.get("/",(req,res)=>{
    res.send("Hello from my HTTP server!");
})

app.get("/todos",(req,res)=>{
    res.json(todos);
})

app.post("/todos",(req,res)=>{
    let task = req.body.task ; 
    const todo = {
        id : todos.length +1 ,
        task : task,
        done : false
    }
    todos.push(todo);
    res.json(todo);
})

app.put("/todos/:id",(req,res)=>{
    const id = parseInt(req.params.id) ; 
    let todo = todos.find((todo)=>{
        return todo.id===id;
    })
    if(!todo){
        res.status(404).json({message: "Todo not found!"});
    }
    else{
        todo.done = true;
        res.json(todo);
    }
    
})

app.delete("/todos/:id",(req,res)=>{
    const id = parseInt(req.params.id) ; 
    let todo = todos.find((todo)=>{
        return todo.id===id;
    })
    if(!todo){
        res.status(404).json({message : "Todo not found!"});
    }
    else{
         let newTodos = todos.filter((todo)=>{
        return todo.id != id
        })
        todos = newTodos;
        res.json(todos);
    }
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});