import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const body = await request.json();
    const { title, content, tags } = body;

    // Validate required fields
    if (!title || !title.trim()) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Title is required'
      }), { status: 400 });
    }

    if (!content || !content.trim()) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Content is required'
      }), { status: 400 });
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Check for existing files with this slug
    const blogDir = path.resolve(process.cwd(), 'src/content/blog');
    console.log('[create-post] CWD:', process.cwd(), 'Blog dir:', blogDir);
    
    // Ensure the directory exists
    if (!fs.existsSync(blogDir)) {
      fs.mkdirSync(blogDir, { recursive: true });
    }

    // Find available filename - use timestamp for uniqueness
    const timestamp = Date.now();
    let filename = `${slug}-${timestamp}.md`;
    // Double-check it doesn't conflict (extremely rare)
    let counter = 1;
    while (fs.existsSync(path.join(blogDir, filename))) {
      filename = `${slug}-${timestamp}-${counter}.md`;
      counter++;
    }

    // Parse tags
    const tagsArray = tags 
      ? tags.split(',').map((t: string) => t.trim()).filter((t: string) => t)
      : [];

    // Get current date and time
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(' ')[0].substring(0, 5); // HH:MM format

    // Build markdown file content with frontmatter
    const frontmatter = [
      '---',
      `title: "${title.replace(/"/g, '\\"')}"`,
      `date: ${date}`,
      `time: ${time}`,
      tagsArray.length > 0 ? `tags: [${tagsArray.map((t: string) => `"${t.replace(/"/g, '\\"')}"`).join(', ')}]` : 'tags: []',
      '---',
      '',
      content
    ].join('\n');

    // Write the file
    const filePath = path.join(blogDir, filename);
    fs.writeFileSync(filePath, frontmatter, 'utf-8');

    // Return success with redirect URL (to the new post)
    // Use filename without extension for redirect
    const redirectUrl = `/${filename.replace('.md', '')}`;

    return new Response(JSON.stringify({
      success: true,
      message: 'Post created successfully',
      redirectUrl
    }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error creating post:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Failed to create post. Please try again.'
    }), { status: 500 });
  }
};