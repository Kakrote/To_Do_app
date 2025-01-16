const express=require('express')
const {getTasks, createTask, updateTask, deleteTask}=require('../controllers/taskController')
const router=express.Router()

router.get('/api/tasks',getTasks)
router.post('/api/tasks',createTask)
router.put('/api/tasks/:id',updateTask)
router.delete('api/tasks/:id',deleteTask)

module.exports=router
