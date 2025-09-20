// ============== PART 1: Homepage par Posts Load Karna ==============
// Yeh code sirf homepage (index.html) par kaam karega
const postsContainer = document.getElementById('posts-container');

if (postsContainer) {
    // Agar posts-container mil gaya, matlab hum homepage par hain
    
    // posts.js file se saara data le rahe hain
    allPosts.forEach(post => {
        const postItem = document.createElement('div');
        postItem.classList.add('post-item');
        
        // Post ka HTML banaya
        postItem.innerHTML = `
            <h3><a href="${post.link}">${post.title}</a></h3>
            <p>${post.summary}</p>
            <a href="${post.link}" class="read-more-btn">Read More</a>
        `;
        
        // Banaya hua HTML ko homepage par daal diya
        postsContainer.appendChild(postItem);
    });
}


// ============== PART 2: Global Features (Har Page Ke Liye) ==============
// Yeh code har page (homepage aur post pages) par kaam karega

// Audio Player ka code
const audioPlayerBtn = document.getElementById('audio-player-btn');
const postContent = document.getElementById('post-content');
let isSpeaking = false;

// Agar audio player button hai, toh uspar click listener lagao
if (audioPlayerBtn) {
    audioPlayerBtn.addEventListener('click', () => {
        if (isSpeaking) {
            speechSynthesis.cancel();
            audioPlayerBtn.textContent = 'Audio';
            isSpeaking = false;
            return;
        }

        if (postContent) {
            // Agar post content hai, toh use padho
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

        } else {
            // Agar post content nahi hai (jaise homepage par), user ko message do
            alert('This feature is only for blog post pages.');
        }
    });
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

