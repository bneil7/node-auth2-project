exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

  const department = [
    {
      name: "hr", // will get id 1
    },
    {
      name: "admin", // will get id 2
    },
  ];

  return knex("department")
    .insert(department)
    .then(() =>
      console.log("\n== Seed data for departments table added. ==\n")
    );
};
