require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const Client = require("./models/client");
const Car = require("./models/car");
const Fix = require("./models/fix");
const { orderedByRecent } = require("./utils");

app.use(cors());
app.use(express.json());

app.get("/api/clients", (_request, response) => {
  Client.find({}).then((clients) => {
    response.json(orderedByRecent(clients));
  });
});

app.post("/api/clients", (request, response) => {
  const body = request.body;

  if (body.name === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const client = new Client({
    name: body.name,
    created_at: new Date(),
  });

  client.save().then((savedClient) => {
    response.json(savedClient);
  });
});

// Car
app.get("/api/cars", (request, response) => {
  const { clientId } = request.query;
  if (clientId)
    Car.find({ client_id: clientId }).then((cars) => {
      response.json(orderedByRecent(cars));
    });
  else
    Car.find({}).then((cars) => {
      response.json(orderedByRecent(cars));
    });
});

app.post("/api/cars", (request, response) => {
  const { body } = request;

  if (body.name === undefined || body.client_id === undefined)
    return response.status(400).json({ error: "content missing" });

  const car = new Car({
    name: body.name,
    client_id: body.client_id,
    created_at: new Date(),
  });

  car.save().then((savedCar) => {
    response.json(savedCar);
  });
});

// Fixes
app.get("/api/fixes", (request, response) => {
  const { carId, orderBy } = request.query;
  if (carId)
    Fix.find({ car_id: carId }).then((fixes) => {
      response.json(orderedByRecent(fixes));
    });
  else
    Fix.find({}).then((fixes) => {
      response.json(orderedByRecent(fixes));
    });
});

app.post("/api/fixes", (request, response) => {
  const { body } = request;

  if (body.name === undefined || body.car_id === undefined)
    return response.status(400).json({ error: "content missing" });

  const fix = new Fix({
    name: body.name,
    car_id: body.car_id,
    date: new Date(),
  });

  fix.save().then((savedFix) => {
    response.json(savedFix);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
