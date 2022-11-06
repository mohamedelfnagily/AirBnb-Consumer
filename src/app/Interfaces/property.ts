export interface Property {
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
    hosterId:string;
    pictures:any[];
}
