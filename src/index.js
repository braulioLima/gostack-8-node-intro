const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

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

server.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  let project = projects.find( proj => proj.index === id);

  project = {...project, title};

  return res.json(project);

});

server.delete('/projects/:id', (req, res) => {
  const { id } = req.params;

  projects.splice(id, 1);

  return res.send();

});

server.post('/projects/:id/tasks', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  let project = projects.find( proj => proj.id === id);

  project.tasks.push(title);

  return res.json(project);

});

server.listen(3000);