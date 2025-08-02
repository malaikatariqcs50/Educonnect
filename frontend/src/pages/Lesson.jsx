import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const LessonPage = ()=>{
    const { courseId, lessonId } = useParams();
    const [ course, setCourse ] = useState(null)
    const [ lesson, setLesson ] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/login");
        return;
    }

    const fetchLesson = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/get-lesson/${courseId}/${lessonId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.status === 200) {
                setLesson(response.data.lesson);
            }
        } catch (err) {
            console.error("Error fetching lesson:", err);
        }
    };

    fetchLesson();
}, [courseId, lessonId]);
    
    if(!lesson)
        return <p>Loading......</p>
    
    return(
        <div className="p-6">
        <h2 className="text-xl font-bold mb-2">{lesson.title}</h2>
        <p className="text-sm text-gray-600 mb-4"> Python — {lesson.duration}</p>
        <iframe
            src={lesson.url.replace('/view', '/preview')}
            width="100%"
            height="480"
            allowFullScreen
            className="rounded-lg shadow"
        />
        </div>
    )
}

export default LessonPage;