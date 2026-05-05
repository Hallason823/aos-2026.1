const getEducationModel = (sequelize, { DataTypes }) => {
  const Education = sequelize.define("education", {
    institution: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    course: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    degree: {
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
    tableName: "educations",
    freezeTableName: true,
  });

  Education.associate = (models) => {
    Education.belongsTo(models.Person);
  };

  return Education;
};

export default getEducationModel;
