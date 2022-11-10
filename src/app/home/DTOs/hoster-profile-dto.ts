export interface HosterProfileDto {
    id:string;
    userName:string;
    email:string;
    phoneNumber:string;
    firstName:string;
    lastName:String;
    birthDate:Date;
    profilePicture:[];
    userQRCode:[];
    rating:number;
    balance:number;
    errors:string;
    languagues:string[];
    password:string;
    propertiesOwned:number;
}
