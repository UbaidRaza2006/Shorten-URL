const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

// Middleware
app.use(express.json());

const corsOptions = {
    origin: 'https://shorten-url-flax.vercel.app', // Your deployed domain
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type'
};

app.use(cors(corsOptions));


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas successfully.");
  })
  .catch(err => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });

const urlSchema = new mongoose.Schema({
    originalUrl: String,
    shortUrl: String,
    clicks: Number,
    clickData: [Object],  // Array to store click data
});

const Url = mongoose.model('Url', urlSchema);

app.post('/shorten', async (req, res) => {
    const { originalUrl } = req.body;
    const shortUrl = shortid.generate();

    const newUrl = new Url({
        originalUrl,
        shortUrl,
        clicks: 0,
        clickData: [],
    });

    await newUrl.save();
    res.send({ shortUrl: `https://shorten-url-flax.vercel.app/${shortUrl}` });
});


app.get('/:shortUrl', async (req, res) => {
    const shortUrl = req.params.shortUrl;
    const urlData = await Url.findOne({ shortUrl });

    if (urlData) {
        urlData.clicks++;
        urlData.clickData.push({
            ip: req.ip,
            userAgent: req.headers['user-agent'],
            referrer: req.get('Referrer') || 'Direct',
            language: req.headers['accept-language'],
            timestamp: new Date(),
        });
        await urlData.save();

        res.redirect(urlData.originalUrl);
    } else {
        res.status(404).send('URL not found');
    }
});

app.listen(process.env.PORT || 3001, () => {
    console.log('Server running on http://localhost:3001');
});
