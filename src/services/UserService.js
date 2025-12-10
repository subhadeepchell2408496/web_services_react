import axios from 'axios';


//it's a typescript class
class UserService{
    // method to get users from the data
    constructor() {
        this.url = 'https://jsonplaceholder.typicode.com/users';
    }

    getUsers(){
        return axios.get('https://jsonplaceholder.typicode.com/users');
    }
}

export default new UserService();