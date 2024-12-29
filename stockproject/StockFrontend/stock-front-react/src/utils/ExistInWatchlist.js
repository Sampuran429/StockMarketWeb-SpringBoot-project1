export const  existInWatchlist=(items,stock)=>{
    for(let item of items){
        if(item?.id===stock?.id)return true
    }
    return false;
}