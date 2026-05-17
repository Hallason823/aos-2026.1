import bcrypt from "bcryptjs";

const getUserModel = (sequelize, { DataTypes }) => {
  const User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  User.addHook("beforeCreate", async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  User.addHook("beforeUpdate", async (user) => {
    if (user.changed("password")) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  User.prototype.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

  User.associate = (models) => {
    User.hasMany(models.Message, { onDelete: "CASCADE" });
    User.hasMany(models.Tarefa, { onDelete: "CASCADE" });
    User.hasMany(models.RefreshToken, { onDelete: "CASCADE" });
  };

  User.findByLogin = async (login) => {
    let user = await User.findOne({
      where: { username: login },
    });

    if (!user) {
      user = await User.findOne({
        where: { email: login },
      });
    }

    return user;
  };

  return User;
};

export default getUserModel;
