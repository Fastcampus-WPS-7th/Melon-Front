// -> function initUserInfo() {}
// 0. UserDetail과 /api/members/info/를 연결시키는 부분을 백엔드에 구현, Postman으로 테스트
//      HTTP Header 'Authorization'에 'Token <value>'를 담아서 요청
//      APIView를 상속받은 View를 하나 만들고, get요청이 오면 (generic뷰 아님)
//        곧바로 request.user를 사용해서 Serialize한 결과를 리턴

// 1. 클라이언트에 'token'이라는 Cookie가 있는지 확인
// 2. 만약 있다면 해당 값을 가져온 후
// 3. getUserInfo ()를 실행
//      -> UserDetail에 get요청, pk없음
//          URL: /api/members/info/
//            HTTP Header 'Authorization'에 'Token <value>'값을 담아서 요청
//          request.user를 기준으로 serialize한 User정보를 리턴
// 4. 유저정보를 가져온 후 getAuthToken의 .then()아래 유저정보 표시 로직을 실행
function initUserInfo () {
  var token = getCookie('token');
  if (token) {
    axios({
      url: 'http://localhost:8000/api/members/info/',
      method: 'get',
      headers: {
        Authorization: 'Token' + ' ' + token
      }
    }).then(function (response) {
      // response.data는 User객체
      // 받은 User객체를 사용해서 setUserInfo함수 실행, UI변경
      setUserInfo(response.data);
    }).catch(function (error) {
      console.log(error.response);
    });
  }
}
function setUserInfo (user) {
  // 유저정보를 표시할 요소에 텍스트를 채움
  $('#user-info').text(user.username + ' (으)로 로그인 중');
  // 이후 해당 요소의 'none'클래스 속성을 삭제
  $('#user-info').removeClass('none');
  // form#login에 'none'클래스 추가
  $('form#login').addClass('none');
}