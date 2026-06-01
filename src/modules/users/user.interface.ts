export interface iUser {
    name:string;
    email:string;
    password:string;
    is_active?:boolean;
    age?:number;
    role?:string;
}