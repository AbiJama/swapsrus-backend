const {Toy} = require('../models')

const createToy = async (req, res) => {
    try {
        const createToyRecord = await Toy.create(req.body)
        res.status(201).json(createToyRecord)
    }catch(error){
        res.status(500).json(error)
    }
}

const getAllToys = async (req, res) => {
    try{
        const getAllToyRecords = await Toy.findAll()
        res.status(200).json(getAllToyRecords)
    }catch(error){
        res.status(500).json(error)
    }
}

const getToyById = async (req, res) => {
    const {id} = req.params
    try {
        const getToyRecord = await Toy.findByPk(id)
        if(!getToyRecord){
            return res.status(404).json({error: "The id could not be found."})
        }
        res.status(200).json(getToyRecord)
    }catch(error){
        res.status(500).json(error)
    }
}

const deleteToyById = async (req, res) => {
    const {id} = id
    try {
        const currentToyRecord = await Toy.findByPk(id)
        if(!currentToyRecord){
            return res.status(404).json({error: "The id could not be found."})
        }
        const deletedToyRecord = await Toy.destroy({where:{id:id}})
    }catch(error){
        res.status(500).json(error)
    }
}



module.exports = {createToy, getAllToys, getToyById, deleteToyById}