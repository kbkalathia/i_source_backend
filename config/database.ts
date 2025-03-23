import { Sequelize } from "sequelize";

const sequelize = new Sequelize("i_source", "postgres", "root", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected..!!");
  } catch (error) {
    console.error("Unable to connect to the database", error);
  }
})();

export default sequelize;
