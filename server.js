const path = require('path');
const express = require("express");
const PORT = process.env.PORT || 3001;
const axios = require("axios");
const app = express();

app.use(express.static(path.resolve(__dirname, "./build")));

app.get("/api/waittimes/:id", async (req, res) => {
  const parkId = req.params.id;
  try {
    const response = await axios.get(
      `https://queue-times.com/parks/${parkId}/queue_times.json`
    );
    const { lands } = response.data;
    res.json({ lands });
  } catch (err) {
    const { status, error } = err.response.data;
    res.status(status).json({ error: error });
  }
});

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });

