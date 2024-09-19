'use strict';

const nameInput = document.getElementById('name');
const birthInput = document.getElementById('birth');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');

assessmentButton.addEventListener(
    'click',
    () => {
        console.log('ボタンが押されました');
        const userName = nameInput.value;
        const birth = birthInput.value;

        if (userName.length === 0 && birth.length === 0) {
            window.alert('名前と誕生日を入力してください');
        } else if (userName.length === 0) {
            window.alert('名前を入力してください');
        } else if (birth.length === 0) {
            window.alert('誕生日を入力してください');
        }


        resultDivision.innerText = '';

        const headerDivision = document.createElement('div');
        headerDivision.setAttribute('class', 'card-header text-bg-primary');
        headerDivision.innerText = '診断結果';

        const bodyDivision = document.createElement('div');
        bodyDivision.setAttribute('class', 'card-body');

        const paragraph = document.createElement('p');
        paragraph.setAttribute('class', 'card-text');
        const result = assessment(userName, birth);
        paragraph.innerText = result;
        bodyDivision.appendChild(paragraph);

        resultDivision.setAttribute('class', 'card');
        resultDivision.appendChild(headerDivision);
        resultDivision.appendChild(bodyDivision);
    }
);

const answers = [
    '###userName###の今年の運勢は「大吉」です！今年一年、良いことありそう！',
    '###userName###の今年の運勢は「吉」です！',
    '###userName###の今年の運勢は「中吉」です！',
    '###userName###の今年の運勢は「小吉」です！',
    '###userName###の今年の運勢は「末吉」です！',
    '###userName###の今年の運勢は「凶」です！気を付けて過ごそう！',
    '###userName###の今年の運勢は「大凶」です！お祓いに行こう！'
];

function assessment(userName, birth) {
    // 名前と誕生日を組み合わせてハッシュ値を生成
    const combinedInput = userName + birth;
    let hash = 0;
    for (let i = 0; i < combinedInput.length; i++) {
        const char = combinedInput.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }

    // ハッシュ値を使って一意の結果を選択
    const index = Math.abs(hash) % answers.length;
    let result = answers[index];
    result = result.replaceAll('###userName###', userName);
    return result;
}