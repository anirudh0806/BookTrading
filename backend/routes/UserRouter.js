const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const fetchTemplateCopy = require('../models/fetchmodels');

router.post('/register', async (req, res) => {
  try {
    const { email, password, passwordCheck, username } = req.body;

    if (!email || !password || !passwordCheck || !username)
      return res.status(400).json({ msg: 'All fields are required' });
    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: 'Password should be atleast six characters' });
    if (password !== passwordCheck)
      return res.status(400).json({ msg: 'Password do not match' });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res.status(400).json({ msg: 'User already exists' });

    const salt = await bcrypt.genSalt();
    const encpassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: encpassword,
      username,
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: 'All fields are required' });
    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: 'Password should be atleast six characters' });

    const user = await User.findOne({ email: email });

    if (!user) return res.status(400).json({ msg: 'Invalid Email' });
    const check = await bcrypt.compare(password, user.password);
    if (!check) return res.status(400).json({ msg: 'Incorrect Password' });
    res.json({
      user: {
        username: user.username,
        password: user.password,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post('/profile', async (request, response) => {
  const fetchedUser = new fetchTemplateCopy({
    bookName: request.body.bookName,
    author: request.body.username,
    email: request.body.email,
    phoneno: request.body.phoneno,
  });
  fetchedUser
    .save()
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      response.json(error);
    });
});

router.get('/search', async (req, res) => {
  const a = await fetchTemplateCopy.find();
  const user = await User.findOne({ email: req.query.email });
  res.send({ a, user });
});

router.post('/delete', async (req, res) => {
  id = req.body.id;
  await fetchTemplateCopy.deleteOne({ _id: id });
  res.send('deleted');
});
router.post('/add', async (req, res) => {
  id = req.body.id;
  const cart = req.body.cart;
  const item = await fetchTemplateCopy.findOne({ _id: id });
  let flag = false;
  cart.forEach((element) => {
    console.log(id, 'asdasd', element._id);
    if (element._id === String(id)) {
      flag = true;
    }
  });
  if (flag) res.status(200).json({ message: 'Item already present in cart' });
  else {
    cart.push(item);
    console.log(cart);
    User.update({ email: req.body.email }, { cart: cart })
      .exec()
      .then((result) => {
        console.log(result);
        res.status(200).json({ message: 'Added to cart' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  }
});
router.post('/addFromSearch', async (req, res) => {
  book = req.body.book;
  const cart = req.body.cart;
  let flag = false;
  cart.forEach((element) => {
    if (element._id === String(book._id)) {
      flag = true;
    }
  });
  if (flag) res.status(200).json({ message: 'Item already present in cart' });
  else {
    cart.push(book);
    console.log(cart);
    User.update({ email: req.body.email }, { cart: cart })
      .exec()
      .then((result) => {
        console.log(result);
        res.status(200).json({ message: 'Added to cart' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  }
});
router.post('/deleteFromCart', async (req, res) => {
  index = req.body.index;
  const cart = req.body.cart;
  cart.splice(index,1)
    User.update({ email: req.body.email }, { cart: cart })
      .exec()
      .then((result) => {
        console.log(result);
        res.status(200).json({ message: 'Deleted Item' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  })
  router.post('/clearCart', async (req, res) => {
    cart = req.body.cart;
    cart.forEach(async (element) => {
      console.log(element._id );
      if(element._id.length==24)
      await fetchTemplateCopy.deleteOne({ _id: element._id });
    });
      User.update({ email: req.body.email }, { cart: [] })
        .exec()
        .then((result) => {
          console.log(result);
          res.status(200).json({ message: 'Purchase Successful' });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: err });
        });
    })
module.exports = router;
