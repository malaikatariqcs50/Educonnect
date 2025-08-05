import { useNavigate } from "react-router-dom";
import api from "../axios"
import { useEffect } from "react";

const Logout = () => {

    const navigate = useNavigate();

    useEffect(()=>{
        const performLogout = async()=>{
            const token = localStorage.getItem("token");
            try{
                if(token){
                    api.get("/logout", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                }
            }
            catch(error){
                console.log("Error logging out: ", error)
            }
            finally{
                localStorage.clear();
                navigate("/login")
            }
        }
        performLogout();
    }, [navigate])
    return null
}

export default Logout;