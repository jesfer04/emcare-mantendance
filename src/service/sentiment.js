import axios from "axios";



const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods' : 'GET, PUT, POST, DELETE, OPTIONS'
  }
}
const url = 'https://emcare-expressjs-api.herokuapp.com/get-sentiment'
const params = new URLSearchParams()
params.append('userid', 'VGL5Dx0gufWXtXlPD2tGfnlayxJ3')


export const getSentiments = () => {
  axios.post(url, params, config)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
} 