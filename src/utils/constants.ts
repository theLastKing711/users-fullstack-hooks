import About from "../pages/About";
import ContactUs from "../pages/ContactUs";
import Home from "../pages/Home";
import TestForm from "../pages/TestForm";
import UserDetails from "../pages/UserDetails";
import UserForm from "../pages/UserForm";
import Users from "../pages/Users";

 interface routeParams {
    id: number;
    name: string;
    url: string;
    component: React.FC;
  }
  
  export const pages: routeParams[] = [
    { id: 1, name: "home", url: "" , component: Home },
    { id: 2, name: "about", url: "about", component: About },
    { id: 3, name: "contact us", url: "contactus", component: ContactUs },
    // { id: 4, name: "User Form", url: "user-form", component: <UserForm },
    { id: 5, name: "users", url: "users", component: Users },
    { id: 6, name: "userDetails", url: "users/:id", component: UserDetails },

  ];

  export const apiURL: string = 'http://127.0.0.1:8000/api/'