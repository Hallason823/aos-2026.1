import { projectService } from "../services";

const getProjects = async (req, res) => {
  const projects = await projectService.getAllProjects();
  return res.status(200).send(projects);
};

const getProject = async (req, res) => {
  const project = await projectService.getProjectById(req.params.projectId);
  if (!project) return res.status(404).send({ error: "Project not found." });
  return res.status(200).send(project);
};

const createProject = async (req, res) => {
  const project = await projectService.createProject({
    name: req.body.name,
    description: req.body.description,
    link: req.body.link,
    technologies: req.body.technologies,
    personId: req.body.personId,
  });
  return res.status(201).send(project);
};

const updateProject = async (req, res) => {
  const response = await projectService.updateProject(req.params.projectId, {
    name: req.body.name,
    description: req.body.description,
    link: req.body.link,
    technologies: req.body.technologies,
    personId: req.body.personId,
  });
  if (response[0] === 0) return res.status(404).send({ error: "Project not found." });
  return res.status(200).send(response[1][0]);
};

const deleteProject = async (req, res) => {
  const result = await projectService.deleteProject(req.params.projectId);
  if (!result) return res.status(404).send({ error: "Project not found." });
  return res.status(204).send();
};

export default { getProjects, getProject, createProject, updateProject, deleteProject };
