const getSkillModel = (sequelize, { DataTypes }) => {
  const Skill = sequelize.define("skill", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    level: {
      type: DataTypes.ENUM("beginner", "intermediate", "advanced"),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
    },
  });

  Skill.associate = (models) => {
    Skill.belongsTo(models.Person);
  };

  return Skill;
};

export default getSkillModel;
