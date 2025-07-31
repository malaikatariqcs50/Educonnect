const mongoose = require('mongoose')

const userCourseSchema = new mongoose.Schema({
    id: {unique: true, type: Number},
    userId: {unique: true, type: Number},
    fullName: String,
    courseName: String,
    completedLessons: {
        type: [
            {
                lessonId: {type: Number, required: true},
                completedAt: { type: Date, default: Date.now }
            }
        ],
        default: []
    }
})

const userCourseModel = mongoose.model('user_course', userCourseSchema);
export default userCourseModel;

/*
id: 1
userId: 1
fullName: Malaika
CourseName: Python
completedLessons: 0 //as soon as lesson is completed
completedLessons: lessonId: 1, completedAt: now
*/

/*
function isModuleCompleted(course, userProgress, moduleIdToCheck) {
  // 1. Get the module from the course
  const module = course.modules.find(mod => mod.id === moduleIdToCheck);
  if (!module) return false; // Invalid module

  // 2. Extract lesson IDs in that module
  const lessonIdsInModule = module.lessons.map(lesson => lesson.id);

  // 3. Extract completed lesson IDs by the user in that module
  const completedLessonIds = userProgress.completedLessons
    .filter(entry => entry.moduleId === moduleIdToCheck)
    .map(entry => entry.lessonId);

  // 4. Check if every lesson in the module is completed
  return lessonIdsInModule.every(lessonId => completedLessonIds.includes(lessonId));
}
*/

/*Usage

const isDone = isModuleCompleted(courseData, userCourseProgress, 3);
if (isDone) {
  console.log("User has completed Module 3 🎉");
} else {
  console.log("Module 3 still in progress");
}

*/