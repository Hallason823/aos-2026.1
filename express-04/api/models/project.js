const getProjectModel = (sequelize, { DataTypes }) => {
  const Project = sequelize.define("project", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    description: {
      type: DataTypes.TEXT,
    },
    link: {
      type: DataTypes.STRING,
    },
    technologies: {
      type: DataTypes.STRING,
    },
  });

  Project.associate = (models) => {
    Project.belongsTo(models.Person);
  };

  return Project;
};

export default getProjectModel;
