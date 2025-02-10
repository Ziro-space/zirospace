import { BlogPost } from "@/domain/models/blog-post.model"
import { blogPostRepositoryLocal } from "@/lib/repositories/blog-post.local.repository"
import { blogPostRepository } from "@/lib/repositories/blog-post.repository"

export interface IBlogPostService {
  getBlogPosts(locale: string): Promise<BlogPost[]>
  getBlogPostBySlug(slug: string, locale: string): Promise<BlogPost | null>
  createBlogPost(blogPost: Omit<BlogPost, 'id'>, locale: string): Promise<BlogPost>
  updateBlogPost(id: string, blogPost: Partial<BlogPost>, locale: string): Promise<BlogPost | null>
  deleteBlogPost(id: string, locale: string): Promise<boolean>
}

export class BlogPostService implements IBlogPostService {
  private blogPostRepository: any //IBlogPostRepository
  constructor() {
    if(process.env.MOCK_REPOSITORIES === 'true') {
      this.blogPostRepository = blogPostRepositoryLocal
    } else {
      this.blogPostRepository = blogPostRepository // TODO: implement postgres repo
    }
  }

  getBlogPosts = async (locale: string): Promise<BlogPost[]> => {
    return this.blogPostRepository.getBlogPosts(locale)
  }

  getBlogPostBySlug = async (slug: string, locale: string): Promise<BlogPost | null> => {
    return this.blogPostRepository.getBlogPostBySlug(slug, locale)
  }

  getBlogPostById = async (id: string, locale: string): Promise<BlogPost | null> => {
    return this.blogPostRepository.getBlogPostById(id, locale)
  }

  createBlogPost = async (blogPost: Omit<BlogPost, 'id'>, locale: string): Promise<BlogPost> => {
    blogPost.createdAt = new Date().toISOString()
    return this.blogPostRepository.createBlogPost(blogPost, locale)
  }

  updateBlogPost = async (id: string, blogPost: Partial<BlogPost>, locale: string): Promise<BlogPost | null> => {
    return this.blogPostRepository.updateBlogPost(id, blogPost, locale)
  }

  deleteBlogPost = async (id: string, locale: string): Promise<boolean> => {
    return this.blogPostRepository.deleteBlogPost(id, locale)
  }
}

// export singleton
export const blogPostService = new BlogPostService()

export const getBlogPostService = async () => {
  return new BlogPostService()
}