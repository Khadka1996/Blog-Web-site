'use client';
import { useState, useEffect } from 'react';
import { FaHeart, FaTrash, FaReply } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function CommentSection({ blog, user }) {
  const router = useRouter();
  const [commentText, setCommentText] = useState("");
  const [blogData, setBlogData] = useState(blog);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [error, setError] = useState(null);

  // Verify token on component mount
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      try {
        const res = await fetch('/api/auth/verify', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) {
          localStorage.removeItem('token');
          router.refresh();
        }
      } catch (error) {
        localStorage.removeItem('token');
      }
    };
    
    verifyToken();
  }, []);

  const handleCommentBoxClick = () => {
    const token = localStorage.getItem('token');
    if (!user && !token) {
      router.push('/login');
      return;
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!user && !token) {
      router.push('/login');
      return;
    }
    
    if (!commentText.trim() || commentText.trim().length < 3) {
      setError("Comment must be at least 3 characters");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      const endpoint = replyingTo 
        ? `/api/comments/${replyingTo}/reply`
        : `/api/blogs/${blog._id}/comments`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ content: commentText }),
      });

      if (res.status === 401) {
        localStorage.removeItem('token');
        router.push('/login');
        return;
      }

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to add comment');
      }

      const updatedBlog = await res.json();
      setBlogData(updatedBlog);
      setCommentText("");
      setReplyingTo(null);
    } catch (error) {
      console.error("Error adding comment:", error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const token = localStorage.getItem('token');
    if (!user && !token) {
      router.push('/login');
      return;
    }
    
    if (!confirm("Are you sure you want to delete this comment?")) return;
    
    try {
      const res = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
        headers: { 
          "Authorization": `Bearer ${token}`
        },
      });

      if (res.status === 401) {
        localStorage.removeItem('token');
        router.push('/login');
        return;
      }

      if (res.status === 403) {
        throw new Error("You don't have permission to delete this comment");
      }

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to delete comment');
      }

      const updatedBlog = await res.json();
      setBlogData(updatedBlog);
    } catch (error) {
      console.error("Error deleting comment:", error);
      setError(error.message);
    }
  };

  const handleLikeComment = async (commentId) => {
    const token = localStorage.getItem('token');
    if (!user && !token) {
      router.push('/login');
      return;
    }

    try {
      const res = await fetch(`/api/comments/${commentId}/like`, {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${token}`
        },
      });

      if (res.status === 401) {
        localStorage.removeItem('token');
        router.push('/login');
        return;
      }

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to like comment');
      }

      const updatedBlog = await res.json();
      setBlogData(updatedBlog);
    } catch (error) {
      console.error("Error liking comment:", error);
      setError(error.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const canDeleteComment = (comment) => {
    if (!user) return false;
    return (
      user.role === 'admin' || 
      user.role === 'mod' || 
      user._id === comment.user?._id
    );
  };

  const renderComments = (comments, depth = 0) => {
    return comments.map((comment) => (
      <div 
        key={comment._id} 
        className={`border-l-2 ${depth > 0 ? 'pl-4 ml-4 border-gray-200' : 'pl-0 border-transparent'}`}
      >
        <div className="py-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-900">
                  {comment.user?.name || 'Anonymous'}
                </span>
                {comment.user?.role && (
                  <span className={`text-xs px-2 py-1 rounded ${
                    comment.user.role === 'admin' ? 'bg-red-100 text-red-800' :
                    comment.user.role === 'mod' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {comment.user.role}
                  </span>
                )}
                <span className="text-xs text-gray-500">
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              <p className="mt-1 text-gray-700">{comment.content}</p>
            </div>
            
            {canDeleteComment(comment) && (
              <button 
                onClick={() => handleDeleteComment(comment._id)}
                className="text-red-500 hover:text-red-700 p-1"
                title="Delete comment"
                aria-label="Delete comment"
              >
                <FaTrash size={14} />
              </button>
            )}
          </div>
          
          <div className="flex items-center mt-2 space-x-4">
            <button 
              onClick={() => handleLikeComment(comment._id)}
              className={`flex items-center space-x-1 ${
                comment.likes?.includes(user?._id) ? 'text-red-500' : 'text-gray-500'
              } hover:text-red-500`}
              aria-label="Like comment"
            >
              <FaHeart size={14} />
              <span className="text-sm">{comment.likes?.length || 0}</span>
            </button>
            
            <button
              onClick={() => {
                const token = localStorage.getItem('token');
                if (!user && !token) {
                  router.push('/login');
                  return;
                }
                setReplyingTo(replyingTo === comment._id ? null : comment._id);
              }}
              className="flex items-center space-x-1 text-gray-500 hover:text-blue-500"
              aria-label="Reply to comment"
            >
              <FaReply size={14} />
              <span className="text-sm">Reply</span>
            </button>
          </div>
          
          {replyingTo === comment._id && (
            <form onSubmit={handleAddComment} className="mt-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => {
                    setCommentText(e.target.value);
                    setError(null);
                  }}
                  placeholder="Write your reply..."
                  className="flex-1 border rounded px-3 py-2 text-sm"
                  required
                  minLength={3}
                  aria-label="Reply text"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600 disabled:opacity-50"
                  aria-label="Submit reply"
                >
                  {isSubmitting ? 'Posting...' : 'Reply'}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </form>
          )}
        </div>
        
        {comment.replies?.length > 0 && renderComments(comment.replies, depth + 1)}
      </div>
    ));
  };

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">Comments ({blogData.comments?.length || 0})</h2>
      
      <div 
        onClick={handleCommentBoxClick}
        className={`mb-6 ${!user ? 'cursor-pointer' : ''}`}
      >
        <form onSubmit={handleAddComment}>
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              {user ? (
                <span className="text-sm font-medium">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              ) : (
                <span className="text-sm">?</span>
              )}
            </div>
            <span className="text-sm font-medium">
              {user ? user.name : 'Please login to comment'}
            </span>
          </div>
          
          <div className="relative">
            <textarea
              value={commentText}
              onChange={(e) => {
                setCommentText(e.target.value);
                setError(null);
              }}
              placeholder={user ? "Write your comment..." : "Click here to login and comment"}
              className={`w-full border rounded-lg px-4 py-3 ${
                user ? 'focus:ring-2 focus:ring-blue-500 focus:border-transparent' : ''
              }`}
              rows="3"
              onClick={handleCommentBoxClick}
              readOnly={!user}
              minLength={3}
              aria-label="Comment input"
            />
            
            {user && (
              <div className="flex justify-between mt-2">
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  type="submit"
                  disabled={isSubmitting || !commentText.trim() || commentText.trim().length < 3}
                  className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Submit comment"
                >
                  {isSubmitting ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
      
      <div className="space-y-4">
        {blogData.comments?.length > 0 ? (
          renderComments(blogData.comments)
        ) : (
          <p className="text-gray-500 text-center py-6">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </section>
  );
}