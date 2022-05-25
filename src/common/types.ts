export interface User {
    name: string;
    email: string;
    password: string;
    phonenumber?: string;
    street?: string;
    address?: string;
  }


  export interface UserResponse {
    id: number,
    name: string,
    email: string,
    password:string,    
    created_at?:string,
    updated_at?:string  
  }