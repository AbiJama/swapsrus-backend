const { User } = require("../models");

const createUser = async (req, res) => {
    try {
        const createUserRecord = await User.create(req.body)
        res.status(201).json(createUserRecord)
    } catch(error){
        res.status(500).json(error)
    }
}

const getUsers = async( _ , res) => {
    try {
        const getUserRecords = await User.findAll()
        res.status(200).json(getUserRecords)

    }catch(error){
        res.status(500).json(error)
    }
}

const getUserById = async (req, res) => {
    const {id} = req.params
    try {
        const getUserRecord = await User.findByPk(id)
        res.status(200).json(getUserRecord)
    }catch(error){
        res.status(500).json(error)
    }
}

const deleteUserById = async (req, res) => {
    const {id} = req.params
    try {
        const currentUserRecord = await User.findByPk(id)
        const deletedUser = await User.destroy({where: {id:id}})

        res.status(204).json(deletedUser)
    }catch(error){
        res.status(500).json(error)
    }
}
module.exports = {createUser, getUsers, getUserById, deleteUserById}