import { createContext, useState } from 'react'

export const CourseDataContext = createContext();

const CourseContext = ({children}) => {
    const [course, setCourse] = useState('')

    return(
        <CourseDataContext.Provider value={{course, setCourse}}>
            {children}
        </CourseDataContext.Provider>
    )
}

export default CourseContext;