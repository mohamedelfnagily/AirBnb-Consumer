import { Property } from "./property";
import { Review } from "./review";

export interface Reservation {
    id:string;
    startDate:string;
    endDate:string;
    totalPrice:number;
    propertyId:string;
    UserId:string;
    note:string;
    review:Review;
    property:Property;
    propertyImage:string;
}
