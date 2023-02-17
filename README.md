https://www.inflearn.com/course/%ED%85%8C%EC%8A%A4%ED%8A%B8%EC%A3%BC%EB%8F%84%EA%B0%9C%EB%B0%9C-tdd-nodejs-api/dashboard

수강이후 실습으로 만든 서버

기능: 기본적으로 id, name 관리
1. 전체 출럭
2. 특정 id 유저 출력
3. 특정 유저 삭제
4. 유저 추가
5. 유저 정보(name) 변겅

서버 구동 순서

1. www.js: db와 시퀼라이저를 동기화하고 서버를 구동
2. index.js: api/user/index.js불러옴
3. api/user/index.js: 라우팅 설정하고 맞는 컨트롤 함수 불러옴
4. api/user/user.ctrl.js: 실제 컨트롤 함수들. db에서 필요한 데이터나 status 보냄

그외
sync-db.js: 모델 가져옴. db 동기화.
models.js: 시퀼라이서 만들고, db랑 연동 시키고 모델 만듬.

