import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

export const GET: APIRoute = async () => {
  const blogDir = path.join(process.cwd(), 'src/content/blog');
  const siteUrl = process.env.SITE_URL || 'http://localhost:4321';
  
  let entries: any[] = [];
  
  if (fs.existsSync(blogDir)) {
    const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
    entries = files.map(file => {
      const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
      const slug = file.replace('.md', '');
      
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      let title = slug;
      let date = new Date();
      let description = '';
      
      if (frontmatterMatch) {
        const fm = frontmatterMatch[1];
        const titleMatch = fm.match(/title:\s*["']?([^"'\n]+)["']?/);
        const dateMatch = fm.match(/date:\s*(\S+)/);
        
        if (titleMatch) title = titleMatch[1].replace(/["']/g, '');
        if (dateMatch) date = new Date(dateMatch[1]);
        
        // Use first 200 chars of content as description
        const contentBody = content.replace(/^---[\s\S]*?---/, '').trim();
        description = contentBody.slice(0, 200).replace(/[#*_`]/g, '') + '...';
      }
      
      return { 
        slug, 
        title, 
        date: date.toISOString(), 
        description,
        link: `${siteUrl}/${slug}`
      };
    });
  }
  
  // Sort by date descending
  entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Generate RSS 2.0 XML
  const rssItems = entries.map(entry => `
    <item>
      <title><![CDATA[${entry.title}]]></title>
      <link>${entry.link}</link>
      <guid isPermaLink="true">${entry.link}</guid>
      <pubDate>${new Date(entry.date).toUTCString()}</pubDate>
      <description><![CDATA[${entry.description}]]></description>
    </item>
  `).join('\n');
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Markdown Blog</title>
    <link>${siteUrl}</link>
    <description>A Markdown-powered blog</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;
  
  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};