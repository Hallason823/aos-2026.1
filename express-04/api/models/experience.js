const getExperienceModel = (sequelize, { DataTypes }) => {
  const Experience = sequelize.define("experience", {
    company: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    startDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
  }, {
    tableName: "experiences",
    freezeTableName: true,
  });

  Experience.associate = (models) => {
    Experience.belongsTo(models.Person);
  };

  return Experience;
};

export default getExperienceModel;
