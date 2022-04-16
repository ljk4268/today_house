const $titleInput = document.querySelector('.title-input');
const $goBack = document.querySelector('.go-back');
const $contentInput = document.querySelector('.content-input');
const $titleLength = document.querySelector('.current-title-length');
const $publishButton = document.querySelector('.publish-button');
const $postForm = document.querySelector('.post-form');
const $imageUpLoad = document.querySelector('#cover-image-upload');
const $imageReUpLoad = document.querySelector('#cover-image-re-upload');
const $coverImage = document.querySelector('.cover-image');
const $fileReUpload = document.querySelector('.file-re-upload-wrapper');

// 태그에 클래스 및 아이디에 해당하는 요소들을 선택함. 


function checkInputLength({
  target
}) {
  if (target.value && target.value.length > 30) {
    alert('30자를 초과한 제목을 입력할 수 없습니다.')
  }

  $titleLength.innerText = target.value.length;
}

function uploadImage(event) {
  // $imageUpLoad와 $imageReUpLoad에 'change'이벤트가 발생될 때 실행될 함수 정의
  const file = event.target.files[0];
  // 첫번째 파일을 선택함.
  const fileReader = new FileReader();
  //  fileReader에 파일리더란 객체를 생성함.
  fileReader.readAsDataURL(file)
  // 파일의 정보를 URL로 가져옴.
  fileReader.onload = (event) => {
    $coverImage.src = event.target.result;
  };
  // 파일정보를 가지고 오면 $coverImage의 src에 읽어온 이미지파일을 넣어줌
  $coverImage.style.display = 'block';
  // 이미지 보여줌
  $fileReUpload.style.display = 'block';
  // 파일리로드 할 수 있는 버튼 보여줌 
}

async function postSubmit(event) {
  event.preventDefault();

  try {
    await fetch('http://localhost:1234/posts', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        title: $titleInput.value,
        content: $contentInput.value,
        image: $coverImage.src,
        // 이미지에 이미지 주소 저장함.
        author: '새로운 유저',
        authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        // 나머지 목록들 채워준거임.
      }),
    });

    window.location.assign('./posts.html')
    // 업로드 되면 posts.html 화면 보여지게 해줌. (=리다이렉트) 경로를 재지정함. 윈도우의 위치를 재지정해주다. 
  } catch (error) {
    alert(error) 
    // 에러 내용이 알람창에 보여질 수 있게 인자로 받은 error를 그대로 알람창에 출력함.
  }

}



$imageUpLoad.addEventListener('change', uploadImage)
$imageReUpLoad.addEventListener('change', uploadImage)
// 선택한 요소에 change 이벤트 리스너를 등록함.


$titleInput.addEventListener('input', checkInputLength)
$postForm.addEventListener('submit', postSubmit)
$publishButton.addEventListener('click', () => {
  $postForm.dispatchEvent(new Event('submit'));
})

$goBack.addEventListener('click', () => {
  window.history.back(1);
})