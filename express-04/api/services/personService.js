import models from "../models";

const getAllPersons = async () => {
  return await models.Person.findAll();
};

const getPersonById = async (id) => {
  return await models.Person.findByPk(id);
};

const createPerson = async (personData) => {
  return await models.Person.create(personData);
};

const updatePerson = async (id, personData) => {
  const response = await models.Person.update(personData, {
    where: { id },
    returning: true,
  });
  return response;
};

const deletePerson = async (id) => {
  return await models.Person.destroy({ where: { id } });
};

export default {
  getAllPersons,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson,
};
