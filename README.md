## 🐾 PetPle
**실시간 채팅부터 산책 기록, 정보 공유 게시판등 반려인을 위한 올인원 커뮤니티 웹사이트**입니다. <br />
반려동물과의 일상, 정보공유 등 다양한 주제로 소통할 수 있습니다.

---

## 📌 실행 방법 
####  - 프론트

    npm install
    npm run dev

#### - 백엔드
    npm install
    node index.js

---

##  🛠️ 기술 스택

___FE___ : vite, react, react-hook-form, typeScript, moduleCSS, tanstack-query, zustand, zod, axios, socket.io-client<br />
___BE___ : node.js, express, mongDB, mongoose, jwt, socket.io<br />
___DevOps___ : AWS S3, docker, git, gitLab, nginx<br />
___etc___: notion, figma

---

## 📄 주요 기능 

⛳️ ___로그인 & 로그아웃 기능___

 - jwt를 사용한 Oauth2 정책으로 로그인 구현 
 - 인증되지 않은 사용자가 로그인이 필요한 페이지에 접속할 경우 로그인 페이지로 리다이렉트

⛳️ ___프로필 기능___

  - 사용자, 반려동물의 프로필 정보를 수정 및 저장
  - AWS S3를 이용한 프로필 이미지 업로드
  - 작성한 게시물, 좋아요 누른 게시물 조회
  - 다른 유저의 프로필 조회

⛳️ ___게시판 기능___

  - 게시글 조회, 작성, 수정, 삭제
  - AWS S3를 활용한 이미지 업로드
  - 게시물 댓글, 대댓글, 좋아요

⛳️ ___채팅 기능___

  - socket.io를 이용한 사용자 프로필에 설정된 위치 기반으로 근처 반려인과 실시간 채팅
