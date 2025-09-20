// Homepage par posts load karne ka code
const postsContainer = document.getElementById('posts-container');
if (postsContainer) {
    // Agar homepage par hain, toh posts dikhao
    allPosts.forEach(post => {
        // HTML code jo post ko homepage par dikhayega
        postsContainer.innerHTML += `
            <div class="post-item">
                <h3><a href="${post.link}">${post.title}</a></h3>
                <p>${post.summary}</p>
                <a href="${post.link}" class="read-more-btn">Read More</a>
            </div>
        `;
    });
}

// Audio Player ka code
const audioPlayerBtn = document.getElementById('audio-player-btn');
const postContent = document.getElementById('post-content');
let isSpeaking = false;

if (audioPlayerBtn && postContent) {
    audioPlayerBtn.addEventListener('click', () => {
        if (isSpeaking) {
            speechSynthesis.cancel();
            audioPlayerBtn.textContent = 'Audio';
            isSpeaking = false;
        } else {
            const title = postContent.querySelector('h1').textContent;
            const paragraphs = Array.from(postContent.querySelectorAll('p')).map(p => p.textContent).join(' ');
            const textToSpeak = `${title}. ${paragraphs}`;
            
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            speechSynthesis.speak(utterance);
            audioPlayerBtn.textContent = 'Stop Audio';
            isSpeaking = true;
            utterance.onend = () => {
                audioPlayerBtn.textContent = 'Audio';
                isSpeaking = false;
            };
        }
    });
} else if (audioPlayerBtn) {
    // Agar post content nahi hai (jaise homepage par), button ko hide kar do
    audioPlayerBtn.style.display = 'none';
}

// Share button ka code
const shareBtn = document.getElementById('share-btn');
if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
        const shareData = {
            title: document.title,
            text: 'Check out this page!',
            url: window.location.href,
        };
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            await navigator.clipboard.writeText(shareData.url);
            alert('Link copied to clipboard!');
        }
    });
}
