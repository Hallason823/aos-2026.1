const getPersonModel = (sequelize, { DataTypes }) => {
  const Person = sequelize.define("person", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: { notEmpty: true, isEmail: true },
    },
    phone: {
      type: DataTypes.STRING,
    },
    linkedin: {
      type: DataTypes.STRING,
    },
    github: {
      type: DataTypes.STRING,
    },
    summary: {
      type: DataTypes.TEXT,
    },
  });

  Person.associate = (models) => {
    Person.hasMany(models.Education, { onDelete: "CASCADE" });
    Person.hasMany(models.Experience, { onDelete: "CASCADE" });
    Person.hasMany(models.Skill, { onDelete: "CASCADE" });
    Person.hasMany(models.Project, { onDelete: "CASCADE" });
  };

  return Person;
};

export default getPersonModel;
