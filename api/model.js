const db = require("../data/dbConfig");

module.exports = {
  find,
  add,
  findBy,
  findById,
  remove,
};

function find() {
  return db("users");
}

function findBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  const [id] = await db("users").insert(user, "id");

  return findById(id);
}

function findById(id) {
  return db("users").where({ id }).first();
}

function remove(id) {
  return db("users").where({ id }).del();
}