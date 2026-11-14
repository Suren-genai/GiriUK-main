import React from 'react';
import { X, Calendar, Clock, User, Share2 } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Header Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-stone-600 shadow-xs transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Feature Image Banner */}
        <div className="relative h-56 sm:h-64 w-full bg-[#FAF7F0] overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#ffdb96] bg-[#00362f]/60 backdrop-blur-xs px-2.5 py-0.5 rounded-full">
              {post.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold mt-2 leading-tight">
              {post.title}
            </h2>
          </div>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-4 text-xs text-stone-500 pb-3 border-b border-stone-200">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#164E45]" />
              <span>{post.author}</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.date}</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <div className="space-y-3.5 text-sm text-stone-700 leading-relaxed font-normal">
            {post.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-200 flex justify-between items-center text-xs text-stone-500">
            <span>Published by GIRI UK Heritage Editorial Desk</span>
            <button
              onClick={() => alert('Article link copied to clipboard!')}
              className="text-[#164E45] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" /> Share Article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
