const ExerciseProgress = (course, userProgress) => {
  if (!course?.modules || !userProgress?.completedLessons) return 0;

  const completedExercises = userProgress.completedExercises.map(e => e.exerciseId);
  const totalExercises = course.modules.length;

  const progressPercentage = Math.round((completedExercises.length / totalExercises) * 100);
  return progressPercentage;
}

export default ExerciseProgress;