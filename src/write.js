const $titleInput = document.querySelector('.title-input');
const $goBack = document.querySelector('.go-back');
const $contentInput = document.querySelector('.content-input');
const $titleLength = document.querySelector('.current-title-length');
const $publishButton = document.querySelector('.publish-button');
const $postForm = document.querySelector('.post-form');


function checkInputLength({target}) {
  if (target.value && target.value.length > 30) {
    alert('30자를 초과한 제목을 입력할 수 없습니다.')
  } 

  $titleLength.innerText = target.value.length;
}

async function postSubmit(event){
  event.preventDefault();

  await fetch('http://localhost:1234/posts', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      title: $titleInput.value,
      content: $contentInput.value,
    }),
  })
}

$titleInput.addEventListener('input', checkInputLength)
$postForm.addEventListener('submit', postSubmit)
$publishButton.addEventListener('click', () => {
  $postForm.dispatchEvent(new Event('submit'));
})

$goBack.addEventListener('click',() => {
  window.history.back(1);
})