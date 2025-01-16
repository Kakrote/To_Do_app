const Task=require('../models/Task')
// get all task
const getTasks=async (req,res)=>{
    try {
        const task=await Task.find();
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
};

// create a new task
const createTask=async (req,res)=>{
    try {
        const {title,description}=req.body
        if(!title){
            return res.status(400).json({msg:"title is required"})
        }
        const task=new Task({
            title,
            description,
            
        })
        const savedTask=await task.save()
        res.status(201).json(savedTask)
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

// Update a task
const updateTask=async (req,res)=>{
    try {
        const task=await Task.findByIdAndUpdate(req.params.id,req.body,{new:res.status(200).json(task)})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}

// Delete a task
const deleteTask= async (req,res)=>{
    try {
        await Task.findByIdAndDelete(req.params.id)
        res.status(200).json({msg:'Task deleted successfully'})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}
module.exports={
    getTasks,
    createTask,
    updateTask,
    deleteTask,
}