import dbQuery from "../database/query.js";

export default async function addSchool(req, res, next) {
  try {
    if (!req.body) throw Error("Please fill all fields!");

    const { name, address, city, state, contact, email } = req.body;

    const textFields = {
      name,
      address,
      city,
      state,
    };

    validateTextFields(textFields);
    validateContact(contact);
    validateEmail(email);

    if (!req.file.filename) throw Error("Please provide Image file");

    const image = req.file.filename;

    const fields = [name, address, city, state, contact, image, email];

    await executeQuery(fields);

    res.json({
      message: "School Saved Successfully",
    });
  } catch (error) {
    res.status(400);

    console.log(error);

    res.json({ error: error.message });
  }
}

function validateTextFields(field) {
  const [[key, value]] = Object.entries(field);
  if (!value) throw Error(`Invalid ${key}`);
}

function validateContact(contact) {
  if (isNaN(+contact) || (+contact).toString().length !== 10)
    throw Error("Invalid Contact Number!");
}

function validateEmail(email) {
  if (
    !email.match(
      /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+\.[a-z]{1,4}$/
    )
  )
    throw Error("Invalid Email address");
}

async function executeQuery(data) {
  const query = `INSERT INTO schools (name, address, city, state, contact, image, email) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  const res = await dbQuery(query, data);

  return res;
}
