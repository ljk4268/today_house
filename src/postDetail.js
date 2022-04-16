const $detailContainer = document.querySelector('.content-container'); 
// 전체 틀 내용 넣으려구 .content-container를 가져옴 
const $coverImage = document.querySelector('.cover-image');
// 커버이미지 넣으려구 .cover-image를 가져옴
const $postContent = document.querySelector('.post-content');
// 포스트내용 넣으려구 .post-content를 가져옴

const postId = new URLSearchParams(window.location.search).get('id')
// url에서 id를 가져오기 위해서 쓰는 표현방식 
// url에서 실제 사이트 주소 뒤에 '?'(쿼리스트링)를 써서 정보를 추가해서 전달할 수 있다.

async function fetchPost(postId) {
  const response = await fetch(`http://localhost:1234/posts/${postId}`)
  // url id에 맞는 내용 갖고와
  const data = await response.json()
  // json 형식으로 바꿔줘

  return data;
  // data 반환해
  // 백틱은 변수가 있을 때 사용하면 됨
}

// 데어터 가져오기 성공하면 내용넣는 부분이야
fetchPost(postId).then((post) => {
  $coverImage.src = post.image;
  // 커버이미지에 이미지 넣는거야
  $postContent.innerText = post.content;
  // 포스트 내용에 내용 넣는거구
  $detailContainer.innerHTML = `<div class="category">온라인 집들이</div>
<div class="title">${post.title}</div>

<div class="profile">
  <div class="profile-image-container">
    <img
      src="${post.authorImage}"
      alt="프로필 이미지"
      class="profile-image"
    />
  </div>
  <div class="profile-detail">
    <span class="profile-detail-nickname">${post.author}</span>
    <span class="profile-detail-date">2021년 11월 27일</span>
  </div>
</div>`
// 이것도 내용 넣는거야. 
});