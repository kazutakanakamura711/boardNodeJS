const $threadSection = document.querySelector('.thread-section');
const $inputTitle = document.querySelector('#inputTitle');
const $inputContent = document.querySelector('#inputContent');
const $form = document.querySelector('.form-section');
let $inputTitleVal = '';
let $inputContentVal = '';

// Threadの全てを読み込む
const getAllThreads = async () => {
  try {
    let allThreads = await axios.get('/api/v1/threads');
    let { data } = allThreads;

    // 出力
    allThreads = data
      .map((thread) => {
        const { title, content } = thread;
        return `
        <div class="single-thread">
          <h3>タイトル${title}</h3>
          <p>内容${content}</p>
        </div>
      `;
      })
      // allThreadsはオブジェクトなのでカンマが表示されるので、
      // join関数で全て連結させてカンマを取り除く
      .join('');
    $threadSection.innerHTML = allThreads;
  } catch (err) {
    console.log(err);
  }
};

getAllThreads();

// postメソッド
inputTitle.addEventListener('change', (e) => {
  $inputTitleVal = e.target.value;
});
inputContent.addEventListener('change', (e) => {
  $inputContentVal = e.target.value;
});

$form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if ($inputTitleVal && $inputContentVal) {
    try {
      await axios.post('/api/v1/thread', {
        title: $inputTitleVal,
        content: $inputContentVal,
      });
      // const removeTargets = document.querySelectorAll(".thread-section");
      // removeTargets.forEach((target) => {
      //   target.remove();
      // });
      getAllThreads();
    } catch (err) {
      console.log(err);
    }
  }
});
