import models from "../models";

const getAllEducations = async () => {
  return await models.Education.findAll();
};

const getEducationById = async (id) => {
  return await models.Education.findByPk(id);
};

const createEducation = async (educationData) => {
  return await models.Education.create(educationData);
};

const updateEducation = async (id, educationData) => {
  const response = await models.Education.update(educationData, {
    where: { id },
    returning: true,
  });
  return response;
};

const deleteEducation = async (id) => {
  return await models.Education.destroy({ where: { id } });
};

export default {
  getAllEducations,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
};
