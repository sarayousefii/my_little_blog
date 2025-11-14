import { useDispatch } from "react-redux"
import { blogReactions } from "../reducers/blogSlice";
const reactions={
    like: "👍",
    dislike: "👎",
    heart:"❤",
    hora:"🎉",
    laugh:"🤣",
    clap:"👏"
}

const ReactionButton=({blog})=>{

    const dispatch=useDispatch();

    const reactionButtons=Object.entries(reactions).map(([name,emoji])=>{
        return(
            <button key={name} type="button" className="muted-button reaction-button" onClick={()=>dispatch(blogReactions({blogId:blog.id,reaction:name}))}>
                {emoji} {blog.reactions[name]}
            </button>
        )
    })
    return(
        reactionButtons
    )
}
export default ReactionButton;