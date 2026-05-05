import Sequelize from "sequelize";

import getPersonModel from "./person";
import getEducationModel from "./education";
import getExperienceModel from "./experience";
import getSkillModel from "./skill";
import getProjectModel from "./project";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  dialectModule: require("pg"),
});

const models = {
  Person: getPersonModel(sequelize, Sequelize),
  Education: getEducationModel(sequelize, Sequelize),
  Experience: getExperienceModel(sequelize, Sequelize),
  Skill: getSkillModel(sequelize, Sequelize),
  Project: getProjectModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };
export default models;
