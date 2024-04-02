import Task from "../model/Task.js";
import { StatusCodes } from "http-status-codes";


export const getAllTasks = async (req, res) => {
    const tasks = await Task.find({ createdBy: req.user.userId })
    
    return res.status(StatusCodes.OK).json({msg: tasks, nbHits: tasks.length})
    
}

export const createTask = async (req, res) => {
    req.body.createdBy = req.user.userId
        const task = await Task.create(req.body)

        return res.status(StatusCodes.CREATED).json(task)
}

export const getTask  = async (req, res) => {
       try {
        const {
            user: {userId},
            params: {id: taskId}
        } = req;
        
        const task = await Task.findById({_id: taskId, createdBy: userId })
    
        res.status(200).json({msg: task})
       } catch (error) {
        console.log(error.message)
       }
}

export const updateTask  = async (req, res) => {
        try {
            const {
                user: {userId},
                body: { description, completed },
                params: {id: taskId}
            } = req;
    
            if (description === '' || completed === '') {
                res.status(StatusCodes.BAD_REQUEST).json({msg: 'Please provide description and completed'})
                return
            }
    
            const task = await Task.findByIdAndUpdate({createdBy: userId, _id: taskId}, req.body, {
                new: true,
                runValidators: true
            })
            res.status(202).json(task)
        } catch (error) {
            console.log(error.message)
        }
    
        
}

export const deleteTask  = async (req, res) => {
    const {
        user: {userId},
        params: {id: taskId}
    } = req;
     const task = await Task.findByIdAndDelete({createdBy: userId, _id: taskId})
    const allTasks = await Task.find({})

     res.status(202).json({deletedTask: task, remainingTasks: allTasks, nbRemainingTasks: allTasks.length})
}
