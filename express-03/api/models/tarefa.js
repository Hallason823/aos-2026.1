const getTarefaModel = (sequelize, { DataTypes }) => {
  const Tarefa = sequelize.define("tarefa", {
    objectId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    concluida: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  });

  Tarefa.associate = (models) => {
    Tarefa.belongsTo(models.User);
  };

  return Tarefa;
};

export default getTarefaModel;