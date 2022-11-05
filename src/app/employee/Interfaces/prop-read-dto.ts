import { User } from "src/app/Interfaces/user";

export interface PropReadDTO {
    id :string;
    description:string;
    location:string;
    price :number;
    rating :number;
    propertyType:string;
    maxNumberOfUsers :number;
    numberOfRooms :number
    wifi:boolean;
    parking :boolean;
    tv :boolean;
    washer :boolean;
    elevator :boolean;
    generator:boolean; 
    privateRoom :boolean;
    smokeAlarm :boolean;
    seaView :boolean;
    errors:string;
    hoster:User;
    hosterProfilePicture:string;
}
