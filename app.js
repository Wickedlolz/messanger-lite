window.onload = () => {
    loadChat();
}

const submitBtn = document.getElementById('submit');
const refreshBtn = document.getElementById('refresh');
submitBtn.addEventListener('click', sendUserInfo);
refreshBtn.addEventListener('click', loadChat);


function sendUserInfo(e) {
    e.preventDefault();

    const author = document.getElementById('author');
    const content = document.getElementById('content');

    if (author.value !== '' && content.value !== '') {
        const initObj = {
            author: author.value,
            content: content.value
        }
    
        fetch('https://rest-messanger-7dc5a-default-rtdb.firebaseio.com/chat/.json', {
            method: 'POST',
            body: JSON.stringify(initObj)
        }).then(loadChat);
    
        author.value = '';
        content.value = '';
    } else {
        const error = { message: '' };

        if (author.value == '') {
            error.message += 'Author must not be empty!';
        }

        if (content.value == '') {
            error.message += 'Content must not be empty';
        }

        handleError(error);
    }
}


function loadChat() {
    const baseUrl = 'https://rest-messanger-7dc5a-default-rtdb.firebaseio.com/chat/.json';
    let textArea = document.getElementById('messages');
    textArea.textContent = '';
    
    fetch(baseUrl).then(res => res.json()).then(data => {
        Object.keys(data).forEach(x => {
            textArea.textContent += `${data[x].author}: ${data[x].content} \n`;
        });
    });
}

function handleError(err) {
    const errorContainer = document.getElementById('errorMessage');
    errorContainer.style.display = 'block';
    errorContainer.textContent = err.message;

    setTimeout(() => {
        errorContainer.style.display = 'none';
    }, 5000);
}