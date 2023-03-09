# Friendly-Potato

해당 Repository는 냉장고 관리 및 레시피 추천 데스크탑 앱입니다.

<br />
<br />

## 프로젝트 주요 기능

1. 냉장고 관리 및 식재료 소비기한, 보관장소 관리
2. 냉장고 속 재료로 레시피 조회
3. 레시피 좋아요, 즐겨찾기
4. 특정 레시피와 유사한 레시피 추천

<br />
<br />

## IBCF 추천 시스템 workflow

![image](https://user-images.githubusercontent.com/62508156/223969038-983df1de-9198-477b-9686-cb0854f3dc37.png)

> 1. node.js 서버로 /recommendations/:id?recipeId=?로 get요청이 들어오면, 사용자들이 페이지에 체류한 시간, 즐겨찾기, 좋아요를 누른 데이터들과 추천 대상인 레시피 id를 Redis 채널 (recommendation_request)에 publish 한다.
>    <br /> <br />
> 2. python 스크립트에 Redis 리스너 (recommendation_request 구독)에서 받은 데이터로 pandas 데이터 프레임을 생성하고 데이터 전처리와 함께 레시피 id 간의 코사인 유사도를 계산하고 가장 유사한 레시피 id 5개를 선택해서 Redis 채널 (recommendation_response) publish한다.
>    <br /> <br />
> 3. node.js 서버에서 Redis 리스너 (recommendation_response 구독)에서 데이터를 받고, 5개의 유사한 레시피 id를 json으로 클라이언트에 응답한다.

<br />

추천 시스템에 관한 설명은 아래 링크에서 더 자세하게 볼 수 있습니다.

[[Node.js/Python] IBCF 레시피 추천 시스템 구현 (1) - 개념 잡기](https://velog.io/@ohjinseo/Node.jsPython-%EC%95%84%EC%9D%B4%ED%85%9C-%EA%B8%B0%EB%B0%98-%ED%98%91%EC%97%85-%ED%95%84%ED%84%B0%EB%A7%81IBCF-%EB%A0%88%EC%8B%9C%ED%94%BC-%EC%B6%94%EC%B2%9C-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%ED%98%84-1)

[[Node.js/Python] IBCF 레시피 추천 시스템 구현 (2) - 구현](https://velog.io/@ohjinseo/Node.jsPython-%EC%95%84%EC%9D%B4%ED%85%9C-%EA%B8%B0%EB%B0%98-%ED%98%91%EC%97%85-%ED%95%84%ED%84%B0%EB%A7%81IBCF-%EB%A0%88%EC%8B%9C%ED%94%BC-%EC%B6%94%EC%B2%9C-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EA%B5%AC%ED%98%84-2-%EA%B5%AC%ED%98%84-%ED%95%98%EA%B8%B0)

<br />
<br />

## Authentication Flow

![image](https://user-images.githubusercontent.com/62508156/223957353-515803eb-d531-4807-9bd3-cba3118fcd4a.png)
<br />

> XSS와 CSRF 공격의 취약점을 방지하기 위해 refreshToken을 secure httpOnly 쿠키로, accessToken은 클라이언트 내 private 변수로 이용

<br />

### 클라이언트에서 리소스 인가 방식

- accessToken은 클라이언트에서 로컬 변수로 관리되므로 페이지 리로드나 브라우저 창이 꺼지면 accessToken은 소멸되며, 일정시간이 지나면 자동으로 만료된다.

- 따라서 로그인을 연장시키기 위해서는 refreshToken을 이용해 서버에서 새로운 accessToken을 발급받고 이를 이용해 로그인을 유지한다.

- 이를 자동으로 처리하기 위해서는 silentRefresh()를 이용하여 accessToken이 만료되기 1분 전에 새로운 accessToken을 발급받도록 하거나, 컴포넌트가 마운트될 때마다 silentRefresh()를 호출하여 로그인을 유지한다.

<br />
<br />

## UI/UX

<details>
<summary>1. 나의 냉장고</summary>
<div markdown="1">

![image](https://user-images.githubusercontent.com/62508156/223991568-0ea6b6dd-b9e2-4458-b427-323dc09321af.png)

</div>
</details>

- 식재료 검색
- 보관장소 별로 조회
- 소비기한 지날 시, 색상 변경
- 식재료 수정, 삭제

<br/>

<details>
<summary>2. 식재료 추가</summary>
<div markdown="1">

![image](https://user-images.githubusercontent.com/62508156/223991812-8ee55c84-7226-434b-9b71-1afd38b1b66d.png)

</div>
</details>

- 식재료 검색
- 카테고리 별로 식재료 조회
- 추가 목록 수정, 삭제

<details>
<summary>모달창</summary>
<div markdown="1">

![image](https://user-images.githubusercontent.com/62508156/223994542-00ab9890-08e5-4bf4-bd55-f9dd26e9c661.png)

</div>
</details>

- 식재료 추가 (보관장소, 수량, 등록일, 유통기한)

<br />

<details>
<summary>3. 레시피 조회</summary>
<div markdown="1">

![image](https://user-images.githubusercontent.com/62508156/223997266-33a58726-a100-4eb8-99e4-427a7a201dab.png)

</div>
</details>

- 가진 식재료들로 만들 수 있는 레시피 조회
