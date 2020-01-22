const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

let amountRequests = 0;


function countRequests(req, res, next) {
  ++amountRequests;
  next();
  console.log(`Counting requests: ${amountRequests}`);
}


function projectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find( proj => id === proj.id);

  if(!project) {
    return res.status(400).json({ error: 'Project does not exists' });
  }

  req.project = project;

  return next();

};

server.use(countRequests);

server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.put('/projects/:id', projectExists , (req, res) => {
  const { title } = req.body;
  const { id } = req.params;
  
  const numId = Number(id);

  const project = { ...req.project, title }

  projects[numId] = project;

  return res.json(project);

});

server.delete('/projects/:id', projectExists, (req, res) => {
  const { id } = req.params;

  projects.splice(id, 1);

  return res.send();

});

server.post('/projects/:id/tasks', projectExists, (req, res) => {
  const { title } = req.body;
  let project = req.project;

  project.tasks.push(title);

  return res.json(project);

});

server.listen(3000);