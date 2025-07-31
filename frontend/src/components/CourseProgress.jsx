const CourseProgress = (course, userProgress) => {
    if (!course?.modules || !userProgress?.completedLessons) return 0;

    const allLessons = course.modules.flatMap(module =>
        module.lessons.map(lesson => lesson.id)
    );

    const completedLessons = userProgress.completedLessons.map(e => e.lessonId);
    const completedCount = allLessons.filter(id => completedLessons.includes(id)).length;

    const progressPercentage = Math.round((completedCount / allLessons.length) * 100);
    return progressPercentage;
};

export default CourseProgress;
