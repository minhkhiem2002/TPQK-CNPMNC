import axios from 'axios'
import { backendURL } from './endpoint'
export default class FinanceRequest{
    static getAllRequest = async () => {
        try {
            const userId = localStorage.getItem("userId");
            let res = await axios.get(`${backendURL}/api/request/`+userId)
            if (res.data){
                return res.data.data
            }
        } catch (error) {
            return []
        }
        return []
    }
    static updateStatus = async (id,status,feedback) => {
        try {
            const userId = localStorage.getItem("userId");
            const role = localStorage.getItem("role");
            const getStatus = (status)=>{
                if (role == "manager") {
                    if (status == "approve"){
                        return "ApprovedByManager"
                    }else{
                        return "RejectedByManager"
                    }
                }else{
                    if (status == "approve"){
                        return "ApprovedByFinance"
                    }else{
                        return "RejectedByFinance"
                    }
                }
            }
            await axios.post(`${backendURL}/api/request/update/` + id,{
                userId :userId,
                status : getStatus(status),
                feedback
            })
      
        } catch (error) {
        }
    }
}