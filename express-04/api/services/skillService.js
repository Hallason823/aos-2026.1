import models from "../models";

const getAllSkills = async () => {
  return await models.Skill.findAll();
};

const getSkillById = async (id) => {
  return await models.Skill.findByPk(id);
};

const createSkill = async (skillData) => {
  return await models.Skill.create(skillData);
};

const updateSkill = async (id, skillData) => {
  const response = await models.Skill.update(skillData, {
    where: { id },
    returning: true,
  });
  return response;
};

const deleteSkill = async (id) => {
  return await models.Skill.destroy({ where: { id } });
};

export default {
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
};
