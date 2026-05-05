import models from "../models";

const getAllProjects = async () => {
  return await models.Project.findAll();
};

const getProjectById = async (id) => {
  return await models.Project.findByPk(id);
};

const createProject = async (projectData) => {
  return await models.Project.create(projectData);
};

const updateProject = async (id, projectData) => {
  const response = await models.Project.update(projectData, {
    where: { id },
    returning: true,
  });
  return response;
};

const deleteProject = async (id) => {
  return await models.Project.destroy({ where: { id } });
};

export default {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
