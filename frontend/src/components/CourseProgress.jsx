const CourseProgress = (course, userProgress) => {
  if (!course?.modules || !userProgress?.completedLessons) return 0;

  const allLessons = course.modules.flatMap(module =>
    module.lessons.map(lesson => lesson.id)
  );

  const completedLessons = userProgress.completedLessons.map(e => e.lessonId);
  const completedExercises = userProgress.completedExercises.map(e => e.exerciseId);

  const completedLessonCount = allLessons.filter(id => completedLessons.includes(id)).length;
  const totalItems = allLessons.length + course.modules.length; // lessons + exercises
  const completedItems = completedLessonCount + completedExercises.length;

  const progressPercentage = Math.round((completedItems / totalItems) * 100);
  return progressPercentage;
};

export default CourseProgress;
