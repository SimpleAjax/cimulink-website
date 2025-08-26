# Blog Management

This directory contains all the technical blog posts for the Cimulink website.

## Adding New Blog Posts

To add a new blog post:

1. Create a new folder in this directory with a descriptive name (e.g., `understanding-microservices`)
2. Inside the folder, create an `index.md` file for your blog post content
3. Place any related assets (images, etc.) in the same folder
4. The blog post will automatically appear on the blog listing page

## Blog Post Format

Blog posts can include frontmatter at the top to specify metadata. The frontmatter should be enclosed between `---` lines at the beginning of the file:

```markdown
---
title: "Title of Your Blog Post"
date: "2025-08-18"
author: "Author Name"
image: "thumbnail-image.png"
description: "A short description of the blog post that will appear in the listing."
---

# Title of Your Blog Post

Introduction paragraph that summarizes what readers will learn.

## Section Header

Content for this section...

## Another Section

More content...

## Conclusion

Summary of key points and takeaways.
```

If no frontmatter is provided, the system will use the following defaults:
- Title: Derived from the H1 heading (#) in the post or the folder name
- Date: Placeholder date (August 18, 2025)
- Author: "Cimulink Team"
- Image: None (placeholder used in listing)
- Description: First paragraph of the post

## Adding Images

To include images in your blog posts:

1. Place image files in the same folder as your `index.md` file
2. Reference them in your markdown using relative paths:

```markdown
![Alt text](image-name.png)
```

For example, if you have a folder structure like:
```
blogs/
└── understanding-microservices/
    ├── index.md
    ├── architecture-diagram.png
    └── performance-chart.png
```

You would reference the images in `index.md` as:
```markdown
![Architecture Diagram](architecture-diagram.png)
![Performance Chart](performance-chart.png)
```

## Frontmatter Fields

- `title`: The title of the blog post (optional if H1 is provided)
- `date`: Publication date in YYYY-MM-DD format
- `author`: Author name
- `image`: Thumbnail image filename (placed in the same folder)
- `description`: Short description for the blog listing

## Folder Structure Example

```
blogs/
├── sample-blog-post/
│   ├── index.md
│   └── sample-image.png
└── another-technical-post/
    ├── index.md
    └── tech-image.png
```

## Best Practices

- Use descriptive folder names for blog posts
- Keep folder names lowercase with hyphens separating words
- Use H1 (#) only for the main blog post title
- Use H2 (##) for section headers
- Use H3 (###) for subsections
- Keep paragraphs short and readable
- Use bullet points and numbered lists where appropriate
- Include alt text for all images
- Place all assets related to a blog post in its folder
