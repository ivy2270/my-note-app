const noteInput = document.getElementById('note');
const saveBtn = document.getElementById('save-btn');
const copyBtn = document.getElementById('copy-btn');
const message = document.getElementById('message');

// 初始化：從 localStorage 讀取筆記
document.addEventListener('DOMContentLoaded', () => {
    const savedNote = localStorage.getItem('note');
    if (savedNote) noteInput.value = savedNote;
});

// 保存筆記到 localStorage
saveBtn.addEventListener('click', () => {
    const noteContent = noteInput.value;
    localStorage.setItem('note', noteContent);
    showMessage('筆記已保存！');
});

// 複製筆記到剪貼簿
copyBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(noteInput.value);
        showMessage('筆記已複製！');
    } catch (err) {
        showMessage('複製失敗！');
    }
});

function showMessage(msg) {
    message.textContent = msg;
    setTimeout(() => (message.textContent = ''), 2000);
}
