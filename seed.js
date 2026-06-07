const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');
const Certificate = require('./models/Certificate');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI must be set in .env');
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const projects = [
      {
        title: 'Water Supply Management',
        description: 'Smart water management system using sensors, dashboards and alerts.',
        image: 'https://via.placeholder.com/640x360.png?text=Water+Supply+Management',
        demoUrl: '#',
        githubUrl: '#',
      },
      {
        title: 'Portfolio Website',
        description: 'Modern portfolio website with responsive design and theme toggle.',
        image: 'https://via.placeholder.com/640x360.png?text=Portfolio+Website',
        demoUrl: '#',
        githubUrl: '#',
      },
    ];

    const certificates = [
      { title: 'Java Programming' },
      { title: 'Web Development' },
      { title: 'Data Structures & Algorithms' },
    ];

    await Project.deleteMany();
    await Certificate.deleteMany();

    await Project.insertMany(projects);
    await Certificate.insertMany(certificates);

    console.log('Seed data created successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seed error:', error.message);
    process.exit(1);
  });
