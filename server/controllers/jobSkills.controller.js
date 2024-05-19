import JobSkills from '../models/jobskill.model.js';

export const getSkillsService = async (req,res,next) => {
    try {
        const skills = await JobSkills.find();
        return res.json(skills);
    } catch (error) {
        console.error("Error en getSkillsService", error);
        next(error);
    }
    }

    export const createSkillsService = async (req,res,next) => {
        console.log("creando nueva JobSkill", req.body);

        try {
            const { name,level } = req.body;
            const newSkill = new JobSkills({name,level});
            await newSkill.save();
            return res.json(newSkill);
        } catch (error) {
            console.error("Error en createSkillsService", error);
            next(error);
        }
        }