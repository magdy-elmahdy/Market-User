// interface is a Custom type To Manage the variables
// بعمله في حاله الاوبجكت الي شايل اكتر من نوع من الداتا وجاي او رايح للباك اند
export interface product {
    id:number,
    title:string,
    price:number,
    category:string,
    description:string,
    image:string,
    rating:{
        rate:number,
        count:number
    },
    hello?:number
}
// ?===> Shar to Optional Property
export interface cart_Products {
    item:product,
    quantity:number
}
