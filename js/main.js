// ============== PART 1: Homepage par Posts Load Karna ==============
const postsContainer = document.getElementById('posts-container');
const showMoreBtn = document.getElementById('show-more-btn');
let postsShown = 0; // Kitne posts dikh rahe hain
const postsPerLoad = 3; // Ek baar mein kitne posts dikhane hain

function loadPosts() {
    const remainingPosts = allPosts.slice(postsShown, postsShown + postsPerLoad);
    
    remainingPosts.forEach((post, index) => {
        const postItem = document.createElement('div');
        postItem.classList.add('post-item');
        
        postItem.innerHTML = `
            <h3><a href="${post.link}">${post.title}</a></h3>
            <p>${post.summary}</p>
            <a href="${post.link}" class="read-more-btn">Read More</a>
        `;
        
        // Animation ke liye style
        postItem.style.animationDelay = `${index * 0.15}s`;
        
        postsContainer.appendChild(postItem);
    });

    postsShown += remainingPosts.length;
    
    // Agar saare posts load ho gaye hain, toh button ko hide kar do
    if (postsShown >= allPosts.length) {
        showMoreBtn.style.display = 'none';
    }
}

// Homepage par hi posts load karo
if (postsContainer) {
    loadPosts();
    showMoreBtn.addEventListener('click', loadPosts);
}


// ============== PART 2: Global Features (Har Page Ke Liye) ==============

// Menu button ka code
const menuBtn = document.getElementById('menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('open');
    });
    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
    });
}


// Audio Player ka code
const audioPlayerBtn = document.getElementById('audio-player-btn');
const postContent = document.getElementById('post-content');
let isSpeaking = false;

if (audioPlayerBtn) {
    audioPlayerBtn.addEventListener('click', () => {
        if (isSpeaking) {
            speechSynthesis.cancel();
            audioPlayerBtn.innerHTML = '<i class="fas fa-microphone"></i>';
            isSpeaking = false;
            return;
        }

        if (postContent) {
            const title = postContent.querySelector('h1').textContent;
            const paragraphs = Array.from(postContent.querySelectorAll('p')).map(p => p.textContent).join(' ');
            const textToSpeak = `${title}. ${paragraphs}`;
            
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            speechSynthesis.speak(utterance);
            audioPlayerBtn.innerHTML = '<i class="fas fa-pause"></i>';
            isSpeaking = true;

            utterance.onend = () => {
                audioPlayerBtn.innerHTML = '<i class="fas fa-microphone"></i>';
                isSpeaking = false;
            };
        } else {
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
