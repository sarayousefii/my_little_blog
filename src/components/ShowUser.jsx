import { useSelector } from "react-redux";
import { selectUserById } from "../reducers/userSlice";


const ShowUser=({userId})=>{
    console.log(userId)
    const author=useSelector(state=>selectUserById(state,userId));

    return(
        <span>{author ? author.fullname : "نویسنده ناشناس"}</span>
    )
    
}
export default ShowUser;