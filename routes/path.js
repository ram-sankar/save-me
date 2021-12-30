const express = require('express');
const app = express();
const asyncMiddleware = require('../middleware/async');
const url_redirect = require('url');
const { Path } = require('../models/path');

app.get('', asyncMiddleware(async (req, res) => {
  res.render('home');   
}))

app.post('/path', asyncMiddleware(async (req, res) => {
  const newPath = req.body.path;
  let path = await Path.findOne({path: newPath}); 
  if (path) return res.status(400).send("path already registered");

  path = new Path({path: newPath})
  await path.save(); 

  res.redirect(url_redirect.format({pathname:`/${newPath}`}));
}))

app.get('/:path', asyncMiddleware(async (req, res) => {
  const newPath = req.params.path;
  let path = await Path.findOne({path: newPath}); 
  if (!path) return res.redirect(url_redirect.format({pathname:`/`}));

  res.render('textEditor',{req, content: path.content});
}));

app.post('/:path', asyncMiddleware(async (req, res) => {
  const newPath = req.params.path;
  let path = await Path.findOne({path: newPath}); 
  if (!path) return res.status(400).send("path does not exist");
  const path2 = await Path.findByIdAndUpdate(path.id, {content: req.body.content}, { new: true });
  console.log(path);
  await path.save(); 
  res.redirect(url_redirect.format({pathname:`/${newPath}`}));
}));

module.exports = app;