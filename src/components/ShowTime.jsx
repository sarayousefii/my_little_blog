import { parseISO, formatDistanceToNow } from "date-fns-jalali";

const ShowTime =({timestamp})=>{
    var timeAgo='';
    if(timestamp){
        const date=parseISO(timestamp);
        const time=formatDistanceToNow(date);
        timeAgo=`${time} قبل`;
    }
    
    return(
        <i>{timeAgo}</i>
    )
}

export default ShowTime;