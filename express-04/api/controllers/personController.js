import { personService } from "../services";

const getPersons = async (req, res) => {
  const persons = await personService.getAllPersons();
  return res.status(200).send(persons);
};

const getPerson = async (req, res) => {
  const person = await personService.getPersonById(req.params.personId);
  if (!person) return res.status(404).send({ error: "Person not found." });
  return res.status(200).send(person);
};

const createPerson = async (req, res) => {
  const person = await personService.createPerson({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    linkedin: req.body.linkedin,
    github: req.body.github,
    summary: req.body.summary,
  });
  return res.status(201).send(person);
};

const updatePerson = async (req, res) => {
  const response = await personService.updatePerson(req.params.personId, {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    linkedin: req.body.linkedin,
    github: req.body.github,
    summary: req.body.summary,
  });
  if (response[0] === 0) return res.status(404).send({ error: "Person not found." });
  return res.status(200).send(response[1][0]);
};

const deletePerson = async (req, res) => {
  const result = await personService.deletePerson(req.params.personId);
  if (!result) return res.status(404).send({ error: "Person not found." });
  return res.status(204).send();
};

export default { getPersons, getPerson, createPerson, updatePerson, deletePerson };
