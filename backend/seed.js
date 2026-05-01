const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Curriculum = require('./models/Curriculum');
const config = require('./config/config');

const seedDatabase = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Curriculum.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const admin = await User.create({
      name: 'AICTE Admin',
      email: 'admin@aicte.gov.in',
      password: 'admin123',
      role: 'admin'
    });
    console.log('Created admin user: admin@aicte.gov.in / admin123');

    // Create sample institute users
    const institute1 = await User.create({
      name: 'IIT Delhi',
      email: 'admin@iitd.ac.in',
      password: 'institute123',
      role: 'institute',
      instituteName: 'Indian Institute of Technology Delhi',
      instituteCode: 'IITD001',
      address: 'Hauz Khas, New Delhi - 110016',
      phone: '011-26591999'
    });

    const institute2 = await User.create({
      name: 'NIT Trichy',
      email: 'admin@nitt.edu',
      password: 'institute123',
      role: 'institute',
      instituteName: 'National Institute of Technology Tiruchirappalli',
      instituteCode: 'NITT001',
      address: 'Tiruchirappalli, Tamil Nadu - 620015',
      phone: '0431-2503000'
    });

    console.log('Created institute users');

    // Create sample curriculum
    const curriculum = await Curriculum.create({
      title: 'B.Tech Computer Science and Engineering',
      description: 'Model curriculum for undergraduate Computer Science program',
      programType: 'UG',
      branch: 'Computer Science and Engineering',
      academicYear: '2024-25',
      version: '1.0',
      status: 'published',
      publishedAt: new Date(),
      createdBy: admin._id,
      semesters: [
        {
          number: 1,
          subjects: [
            {
              name: 'Mathematics I',
              code: 'MA101',
              credits: 4,
              type: 'theory',
              learningOutcomes: [
                'Understand differential calculus',
                'Apply integration techniques',
                'Solve differential equations'
              ]
            },
            {
              name: 'Physics',
              code: 'PH101',
              credits: 4,
              type: 'theory',
              learningOutcomes: [
                'Understand mechanics',
                'Apply electromagnetic principles'
              ]
            },
            {
              name: 'Programming Fundamentals',
              code: 'CS101',
              credits: 4,
              type: 'theory',
              learningOutcomes: [
                'Write programs in C',
                'Understand algorithms',
                'Debug code effectively'
              ]
            },
            {
              name: 'Programming Lab',
              code: 'CS101L',
              credits: 2,
              type: 'practical',
              learningOutcomes: [
                'Implement algorithms',
                'Test programs systematically'
              ]
            }
          ]
        },
        {
          number: 2,
          subjects: [
            {
              name: 'Mathematics II',
              code: 'MA102',
              credits: 4,
              type: 'theory',
              learningOutcomes: [
                'Understand linear algebra',
                'Apply numerical methods'
              ]
            },
            {
              name: 'Data Structures',
              code: 'CS102',
              credits: 4,
              type: 'theory',
              learningOutcomes: [
                'Implement data structures',
                'Analyze algorithm complexity'
              ]
            },
            {
              name: 'Digital Electronics',
              code: 'EC101',
              credits: 3,
              type: 'theory',
              learningOutcomes: [
                'Design digital circuits',
                'Understand logic gates'
              ]
            }
          ]
        }
      ]
    });

    console.log('Created sample curriculum');
    console.log('\n=== Seed Complete ===');
    console.log('Admin Login: admin@aicte.gov.in / admin123');
    console.log('Institute Login: admin@iitd.ac.in / institute123');
    console.log('Institute Login: admin@nitt.edu / institute123');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();

