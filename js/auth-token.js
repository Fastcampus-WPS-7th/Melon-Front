// 1. AuthToken을 받아오는 JS함수를 구현
// function getAuthToken (username, password) {}
//   주어진 매개변수 username과 password를 axios로 전달하고
//   돌아온 'token'값을 console.log에 출력
function getAuthToken (username, password) {
  axios({
    url: 'http://localhost:8000/api/members/auth-token/',
    method: 'post',
    data: {
      username: username,
      password: password
    }
  }).then(function (response) {
    var token = response.data.token;
    var user = response.data.user;
    setCookie('token', token, 7);
    
    setUserInfo(user);
  }).catch(function (error) {
    console.log(error);
    console.log(error.response);
  });
}

// 2. form#login을 구현
//  username, password를 받는 input2개와
//  submit역할을 하는 button
// 해당 form에 'submit'이 실행되었을 때, form자체의 'submit'기능 대신
//  jQuery를 사용해서 아래 getAuthToken()함수를 실행
$('form#login').submit(function (event) {
  // form내부의 input요소들의 값 가져오기
  var username = $('#input-username').val();
  var password = $('#input-password').val();
  
  // Token을 가져오는 함수 실행
  getAuthToken(username, password);
  
  // form내부의 input요소들을 비워줌
  $('#input-username').val('');
  $('#input-password').val('');
  
  // form이 원래 해야하는 동작(이 경우 post요청)을 막음
  event.preventDefault();
});