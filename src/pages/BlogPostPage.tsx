import { blogPosts } from '../data/blog'
import { BlogArticle } from '../sections/BlogArticle'

export default function BlogPostPage({ onNavigate }: { onNavigate: (href: string) => void }) {
  const slug = window.location.pathname.replace(/^\/blog\//, '')
  const post = blogPosts.find((p) => p.slug === slug) ?? blogPosts[0]

  return <BlogArticle post={post} onNavigate={onNavigate} />
}