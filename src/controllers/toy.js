const {Toy} = require('../models')

const createToy = async (req, res) => {
    try {
        const createToyRecord = await Toy.create(req.body)
        res.status(201).json(createToyRecord)
    }catch(error){
        res.status(500).json(error)
    }
}
const createToyByUserUid = async (req, res) => {
    const {uid} = req.params
    try {
        const createToyRecord = await User.findOne({ where: {uid: uid} })
        if(!createToyRecord){
            return res.status(404).json({error: "Toy not added."})
        }
        res.status(200).json(createToyRecord)
    }catch(error){
        console.log(error)
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
const getToyByUserUid = async (req, res) => {
    const {uid} = req.params
    try {
        const getToyRecord = await User.findOne({ where: {uid: uid} })
        if(!getToyRecord){
            return res.status(404).json({error: "The toy could not be found."})
        }
        res.status(200).json(getToyRecord)
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}


const deleteToyByUserUId = async (req, res) => {
    const { id } = req.params;
    try {
        const currentToyRecord = await Toy.findByPk(id);
        if (!currentToyRecord) {
            return res.status(404).json({ error: "The id could not be found." });
        }
        await Toy.destroy({ where: { UserUid: id } }); 
        res.status(204).send(); 
    } catch (error) {
        res.status(500).json(error);
    }
}



module.exports = {createToy,createToyByUserUid, getAllToys, getToyById, deleteToyByUserUId, getToyByUserUid }