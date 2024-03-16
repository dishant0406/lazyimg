import express from 'express';
import bodyParser from 'body-parser';
import { removeBg, removeBgFromUrl } from './src/index.js';
import multer from 'multer';

const app = express();
app.use(bodyParser.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/removebg', upload.single('image'), async (req, res) => {
  try {
    const result = await removeBg(req.file.buffer);
    res.setHeader('Content-Type', 'image/png');
    res.send(new Buffer.from(result.buffer));
  }
  catch (err) {
    res.status(500).send(err);
  }
});

//app .get /remove/anyurlafterthis
app.get('/remove', async (req, res) => {
  try {
    const result = await removeBgFromUrl(req.query.url);
    res.setHeader('Content-Type', 'image/png');
    res.send(new Buffer.from(result.buffer));
  }
  catch (err) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Error: ' + err);
  }
});


app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})
