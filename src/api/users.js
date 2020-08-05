import axios from 'axios'

export default {
  post: () => {
    axios
    .post('http://localhost:1337/auth/local', {
        identifier: this.login,
        password: this.motDePasse,
    })
    .then(response => {
        // Handle success.
        console.log('Authentification réussi ;)');
        this.user = response.data.user;
        this.token =  response.data.jwt;
    })
    .catch(error => {
        // Handle error.
        console.log('An error occurred:', error.response);
    })
  }
    
  
}
