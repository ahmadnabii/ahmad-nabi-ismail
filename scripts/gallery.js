// Gallery Interactive Features
(function() {
    // Like button functionality
    function attachLikeButtons() {
        const likeButtons = document.querySelectorAll('.like-btn');
        likeButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Check if user is logged in
                if (typeof isLoggedIn === 'function' && !isLoggedIn()) {
                    showNotification('Please sign in to like posts', 'info');
                    return;
                }

                const post = this.closest('.gallery-post');
                const likeCount = post.querySelector('.like-count');
                
                // Toggle like state
                this.classList.toggle('liked');
                
                if (this.classList.contains('liked')) {
                    this.style.color = '#ef4444'; // Red color for liked
                    this.style.background = 'rgba(239, 68, 68, 0.1)';
                    
                    // Update like count
                    let currentCount = parseInt(likeCount?.textContent || '0');
                    if (likeCount) {
                        likeCount.textContent = currentCount + 1;
                    }
                } else {
                    this.style.color = '';
                    this.style.background = '';
                    
                    // Update like count
                    let currentCount = parseInt(likeCount?.textContent || '0');
                    if (likeCount) {
                        likeCount.textContent = Math.max(0, currentCount - 1);
                    }
                }
            });
        });
    }

    // Comment button functionality
    function attachCommentButtons() {
        const commentButtons = document.querySelectorAll('.comment-btn');
        commentButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Check if user is logged in
                if (typeof isLoggedIn === 'function' && !isLoggedIn()) {
                    showNotification('Please sign in to comment on posts', 'info');
                    return;
                }

                const post = this.closest('.gallery-post');
                let commentSection = post.querySelector('.comment-section');
                
                if (!commentSection) {
                    // Create comment section
                    commentSection = document.createElement('div');
                    commentSection.className = 'comment-section';
                    commentSection.innerHTML = `
                        <div class="comment-form">
                            <textarea placeholder="Write a comment..." class="comment-input"></textarea>
                            <button class="btn comment-submit-btn">Post Comment</button>
                        </div>
                        <div class="comments-list"></div>
                    `;
                    
                    // Insert after post content
                    const postContent = post.querySelector('.post-content');
                    postContent.appendChild(commentSection);
                    
                    // Add submit functionality
                    const submitBtn = commentSection.querySelector('.comment-submit-btn');
                    const commentInput = commentSection.querySelector('.comment-input');
                    
                    submitBtn.addEventListener('click', function() {
                        const commentText = commentInput.value.trim();
                        if (commentText) {
                            addComment(commentSection, commentText);
                            commentInput.value = '';
                        }
                    });
                }
                
                // Toggle comment section visibility
                commentSection.style.display = commentSection.style.display === 'none' ? 'block' : 'none';
            });
        });
    }

    // Add comment to the list
    function addComment(commentSection, text) {
        const commentsList = commentSection.querySelector('.comments-list');
        const commentElement = document.createElement('div');
        commentElement.className = 'comment-item';
        
        // Get current user info
        const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
        const userName = user ? user.name : 'Anonymous';
        const userAvatar = user ? user.picture : 'assets/banner2.jpg';
        
        commentElement.innerHTML = `
            <div class="comment-author">
                <img src="${userAvatar}" alt="User" class="comment-avatar">
                <span class="comment-name">${userName}</span>
            </div>
            <div class="comment-text">${text}</div>
            <div class="comment-time">Just now</div>
        `;
        commentsList.appendChild(commentElement);
    }

    // Share button functionality
    function attachShareButtons() {
        const shareButtons = document.querySelectorAll('.share-btn');
        shareButtons.forEach(button => {
            button.addEventListener('click', function() {
                const post = this.closest('.gallery-post');
                const postText = post.querySelector('.post-content p')?.textContent || '';
                const shareUrl = window.location.href;
                
                // Create share options
                const shareOptions = document.createElement('div');
                shareOptions.className = 'share-options';
                shareOptions.innerHTML = `
                    <div class="share-option" data-platform="facebook">
                        <span>📘</span> Facebook
                    </div>
                    <div class="share-option" data-platform="twitter">
                        <span>🐦</span> Twitter
                    </div>
                    <div class="share-option" data-platform="whatsapp">
                        <span>📱</span> WhatsApp
                    </div>
                    <div class="share-option" data-platform="copy">
                        <span>📋</span> Copy Link
                    </div>
                `;
                
                // Position share options
                const rect = this.getBoundingClientRect();
                shareOptions.style.position = 'absolute';
                shareOptions.style.top = (rect.bottom + 10) + 'px';
                shareOptions.style.left = rect.left + 'px';
                shareOptions.style.zIndex = '1000';
                
                document.body.appendChild(shareOptions);
                
                // Handle share options
                shareOptions.querySelectorAll('.share-option').forEach(option => {
                    option.addEventListener('click', function() {
                        const platform = this.dataset.platform;
                        handleShare(platform, postText, shareUrl);
                        document.body.removeChild(shareOptions);
                    });
                });
                
                // Remove share options when clicking outside
                setTimeout(() => {
                    document.addEventListener('click', function removeShareOptions() {
                        if (document.body.contains(shareOptions)) {
                            document.body.removeChild(shareOptions);
                        }
                        document.removeEventListener('click', removeShareOptions);
                    });
                }, 100);
            });
        });
    }

    // Handle different share platforms
    function handleShare(platform, text, url) {
        const shareText = encodeURIComponent(text);
        const shareUrl = encodeURIComponent(url);
        
        let shareLink = '';
        
        switch(platform) {
            case 'facebook':
                shareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
                break;
            case 'twitter':
                shareLink = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
                break;
            case 'whatsapp':
                shareLink = `https://wa.me/?text=${shareText} ${shareUrl}`;
                break;
            case 'copy':
                navigator.clipboard.writeText(url).then(() => {
                    showNotification('Link copied to clipboard!');
                });
                return;
        }
        
        if (shareLink) {
            window.open(shareLink, '_blank', 'width=600,height=400');
        }
    }

    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Add CSS for interactive elements
    function addInteractiveStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .comment-section {
                margin-top: 1rem;
                padding-top: 1rem;
                border-top: 1px solid rgba(148,163,184,.1);
            }
            
            .comment-form {
                display: flex;
                gap: 0.5rem;
                margin-bottom: 1rem;
            }
            
            .comment-input {
                flex: 1;
                padding: 0.5rem;
                border: 1px solid rgba(148,163,184,.3);
                border-radius: 8px;
                background: #0b1220;
                color: var(--text);
                resize: vertical;
                min-height: 40px;
            }
            
            .comment-submit-btn {
                padding: 0.5rem 1rem;
                background: linear-gradient(180deg, var(--brand), var(--brand-2));
                color: #05121f;
                border: none;
                border-radius: 8px;
                font-weight: 700;
                cursor: pointer;
            }
            
            .comment-item {
                margin-bottom: 0.75rem;
                padding: 0.5rem;
                background: rgba(148,163,184,.05);
                border-radius: 8px;
            }
            
            .comment-author {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-bottom: 0.25rem;
            }
            
            .comment-avatar {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                object-fit: cover;
            }
            
            .comment-name {
                font-weight: 600;
                color: var(--text);
                font-size: 0.9rem;
            }
            
            .comment-text {
                color: var(--text);
                margin-bottom: 0.25rem;
            }
            
            .comment-time {
                color: var(--muted);
                font-size: 0.8rem;
            }
            
            .share-options {
                background: var(--bg-soft);
                border: 1px solid rgba(148,163,184,.2);
                border-radius: 12px;
                padding: 0.5rem;
                box-shadow: 0 10px 30px rgba(0,0,0,.3);
                min-width: 200px;
            }
            
            .share-option {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem;
                cursor: pointer;
                border-radius: 8px;
                transition: background 0.2s ease;
            }
            
            .share-option:hover {
                background: rgba(124,58,237,.1);
            }
            
            .liked {
                color: #ef4444 !important;
                background: rgba(239, 68, 68, 0.1) !important;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize all functionality
    function init() {
        addInteractiveStyles();
        attachLikeButtons();
        attachCommentButtons();
        attachShareButtons();
    }

    // Start when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
