import { educationService } from "../services";

const getEducations = async (req, res) => {
  const educations = await educationService.getAllEducations();
  return res.status(200).send(educations);
};

const getEducation = async (req, res) => {
  const education = await educationService.getEducationById(req.params.educationId);
  if (!education) return res.status(404).send({ error: "Education not found." });
  return res.status(200).send(education);
};

const createEducation = async (req, res) => {
  const education = await educationService.createEducation({
    institution: req.body.institution,
    course: req.body.course,
    degree: req.body.degree,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    description: req.body.description,
    personId: req.body.personId,
  });
  return res.status(201).send(education);
};

const updateEducation = async (req, res) => {
  const response = await educationService.updateEducation(req.params.educationId, {
    institution: req.body.institution,
    course: req.body.course,
    degree: req.body.degree,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    description: req.body.description,
    personId: req.body.personId,
  });
  if (response[0] === 0) return res.status(404).send({ error: "Education not found." });
  return res.status(200).send(response[1][0]);
};

const deleteEducation = async (req, res) => {
  const result = await educationService.deleteEducation(req.params.educationId);
  if (!result) return res.status(404).send({ error: "Education not found." });
  return res.status(204).send();
};

export default { getEducations, getEducation, createEducation, updateEducation, deleteEducation };
