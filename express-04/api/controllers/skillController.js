import { skillService } from "../services";

const getSkills = async (req, res) => {
  const skills = await skillService.getAllSkills();
  return res.status(200).send(skills);
};

const getSkill = async (req, res) => {
  const skill = await skillService.getSkillById(req.params.skillId);
  if (!skill) return res.status(404).send({ error: "Skill not found." });
  return res.status(200).send(skill);
};

const createSkill = async (req, res) => {
  const skill = await skillService.createSkill({
    name: req.body.name,
    level: req.body.level,
    category: req.body.category,
    personId: req.body.personId,
  });
  return res.status(201).send(skill);
};

const updateSkill = async (req, res) => {
  const response = await skillService.updateSkill(req.params.skillId, {
    name: req.body.name,
    level: req.body.level,
    category: req.body.category,
    personId: req.body.personId,
  });
  if (response[0] === 0) return res.status(404).send({ error: "Skill not found." });
  return res.status(200).send(response[1][0]);
};

const deleteSkill = async (req, res) => {
  const result = await skillService.deleteSkill(req.params.skillId);
  if (!result) return res.status(404).send({ error: "Skill not found." });
  return res.status(204).send();
};

export default { getSkills, getSkill, createSkill, updateSkill, deleteSkill };
