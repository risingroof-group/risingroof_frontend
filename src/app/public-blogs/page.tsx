'use client';

import * as React from 'react';
import axios from 'axios';
import { FileText, Calendar, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/common/Button';

export default function PublicBlogsPage() {
  const [blogs, setBlogs] = React.useState<Record<string, any>[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const url = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000') + '/blogs';
        const res = await axios.get(url);
        setBlogs(res.data);
      } catch (err) {
        console.error('Failed to load blogs', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex flex-col">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900">Industry Insights & News</h1>
          <p className="mt-4 text-slate-500">Read the latest articles from the Rising Roof Group team.</p>
        </div>
        
        {isLoading ? (
          <div className="text-slate-500 animate-pulse text-center">Loading articles...</div>
        ) : blogs.length === 0 ? (
          <div className="text-slate-500 text-center py-10 bg-white rounded-xl shadow-sm border border-slate-200">
            No articles published yet. Check back soon!
          </div>
        ) : (
          <div className="space-y-8">
            {blogs.map((blog) => (
              <article key={blog.id} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1.5" />
                    {new Date(blog.publishedAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center">
                    <UserIcon className="w-4 h-4 mr-1.5" />
                    {blog.author}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  {blog.title}
                </h2>
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap line-clamp-4">
                  {blog.content}
                </p>
                <div className="mt-6 pt-6 border-t border-slate-100">
                   <Button variant="ghost" className="px-0 hover:bg-transparent hover:text-black hover:underline cursor-pointer">
                     Read Full Article
                   </Button>
                </div>
              </article>
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center">
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
