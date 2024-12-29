export const calculateprofit=(order)=>{
    if(order && order.orderItem?.buyprice && order.orderItem?.sellprice){
        return order.orderItem?.sellprice-order.orderItem?.buyprice
    }
    return "-"
}