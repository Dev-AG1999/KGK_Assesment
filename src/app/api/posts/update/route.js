import prisma from '../../../libs/prisma';

export async function POST(request) {
  try {
    const { id, title, content } = await request.json();
    const slug = title.toLowerCase().replace(/\s+/g, '-'); // Simple slug generation

    const post = await prisma.post.upsert({
      where: {
        id: id || 0, // Use `id` if provided; otherwise use a dummy `id` (like `0`) to create a new post
      },
      update: {
        title,
        slug,
        content,
      },
      create: {
        title,
        slug,
        content,
      },
    });

    return new Response(JSON.stringify(post), { status: 201 });
  } catch (error) {
    console.error("Error creating or updating post:", error);
    return new Response(JSON.stringify({ error: 'Failed to create or update post' }), { status: 500 });
  }
}
