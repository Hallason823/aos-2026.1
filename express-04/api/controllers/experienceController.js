import { experienceService } from "../services";

const getExperiences = async (req, res) => {
  const experiences = await experienceService.getAllExperiences();
  return res.status(200).send(experiences);
};

const getExperience = async (req, res) => {
  const experience = await experienceService.getExperienceById(req.params.experienceId);
  if (!experience) return res.status(404).send({ error: "Experience not found." });
  return res.status(200).send(experience);
};

const createExperience = async (req, res) => {
  const experience = await experienceService.createExperience({
    company: req.body.company,
    role: req.body.role,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    description: req.body.description,
    personId: req.body.personId,
  });
  return res.status(201).send(experience);
};

const updateExperience = async (req, res) => {
  const response = await experienceService.updateExperience(req.params.experienceId, {
    company: req.body.company,
    role: req.body.role,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    description: req.body.description,
    personId: req.body.personId,
  });
  if (response[0] === 0) return res.status(404).send({ error: "Experience not found." });
  return res.status(200).send(response[1][0]);
};

const deleteExperience = async (req, res) => {
  const result = await experienceService.deleteExperience(req.params.experienceId);
  if (!result) return res.status(404).send({ error: "Experience not found." });
  return res.status(204).send();
};

export default { getExperiences, getExperience, createExperience, updateExperience, deleteExperience };
