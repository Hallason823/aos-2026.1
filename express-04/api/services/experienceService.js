import models from "../models";

const getAllExperiences = async () => {
  return await models.Experience.findAll();
};

const getExperienceById = async (id) => {
  return await models.Experience.findByPk(id);
};

const createExperience = async (experienceData) => {
  return await models.Experience.create(experienceData);
};

const updateExperience = async (id, experienceData) => {
  const response = await models.Experience.update(experienceData, {
    where: { id },
    returning: true,
  });
  return response;
};

const deleteExperience = async (id) => {
  return await models.Experience.destroy({ where: { id } });
};

export default {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
};
