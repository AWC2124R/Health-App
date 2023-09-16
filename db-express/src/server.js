const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const {UserLogin, UserProfile} = require('./Models/user'); 
const bcrypt = require('bcrypt');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbApiKey = process.env.REACT_APP_DB_API_KEY;

mongoose.connect(dbApiKey, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await UserLogin.findOne({ username });
  
  if (!user) {
    return res.status(400).json({ message: 'Sorry, we couldn\'t locate that user.' });
  }

  const validPassword = bcrypt.compareSync(password, user.password);

  if (!validPassword) {
    return res.status(401).json({ message: 'Please re-enter your password.' });
  }

  // Login successful
  return res.json({ message: 'User Logged.' });
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await UserLogin.findOne({ username });

  if (existingUser) {
    return res.status(409).json({ message: 'Sorry, that username is in use.' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10); // 10 is the saltRounds
  const newUser = new UserLogin({ username, password: hashedPassword });

  await newUser.save();

  return res.json({ message: 'User Registered.' });
});

app.post('/checkprofile', async (req, res) => {
  const { username } = req.body;

  const doesExist = await UserProfile.findOne({ username });
  
  if(!doesExist){
    return res.json({ message: "No profile." });
  }

  return res.json({ message: 'Profile found.' });
});

app.post('getprofile', async (req, res) => {
  const { username } = req.body;

  const userProfile = await UserProfile.findOne({ username });
  if(userProfile){
    res.json(userProfile);
  } else {
    return res.status(404).json({ message: 'User not found' });
  }
});

app.post('/createprofile', async (req, res) => {
  const { username, age, gender, height, weight, ethnicity, goals } = req.body;
  const newUserProfile = new UserProfile({username, age, gender, height, weight, ethnicity, goals});

  try {
    await newUserProfile.save();
    return res.json({message: 'User Profile Created'});
  } catch (error) {
    console.error(error);
    return res.status(400).json({message: 'UserProfile validation failed', error: error.message});
  }
});

// User.collection.drop()
//   .then(() => console.log('Collection dropped'))
//   .catch(err => console.log('Error', err));