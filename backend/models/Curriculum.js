const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
    required: true,
    trim: true
  },
  credits: {
    type: Number,
    required: true,
    min: 1
  },
  type: {
    type: String,
    enum: ['theory', 'practical', 'elective'],
    default: 'theory'
  },
  learningOutcomes: [{
    type: String,
    trim: true
  }]
});

const semesterSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    min: 1
  },
  subjects: [subjectSchema],
  totalCredits: {
    type: Number,
    default: 0
  }
});

const curriculumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Curriculum title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  programType: {
    type: String,
    enum: ['UG', 'PG', 'Diploma'],
    required: true
  },
  branch: {
    type: String,
    required: true,
    trim: true
  },
  academicYear: {
    type: String,
    required: [true, 'Academic year is required']
  },
  version: {
    type: String,
    required: [true, 'Version is required'],
    default: '1.0'
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  semesters: [semesterSchema],
  syllabusFile: {
    filename: String,
    originalName: String,
    path: String,
    uploadedAt: Date
  },
  supportingDocuments: [{
    filename: String,
    originalName: String,
    path: String,
    uploadedAt: Date
  }],
  totalCredits: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  publishedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Calculate total credits before saving
curriculumSchema.pre('save', function() {
  let total = 0;
  this.semesters.forEach(semester => {
    let semTotal = 0;
    semester.subjects.forEach(subject => {
      semTotal += subject.credits;
    });
    semester.totalCredits = semTotal;
    total += semTotal;
  });
  this.totalCredits = total;
});

module.exports = mongoose.model('Curriculum', curriculumSchema);

