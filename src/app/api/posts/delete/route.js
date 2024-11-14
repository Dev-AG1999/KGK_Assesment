import prisma from '../../../libs/prisma';

export async function DELETE(request) {
  try {
    const { id } = await request.json();
 

    const post = await prisma.post.delete({
      where: {
        id: id 
      },

    });

    return new Response(JSON.stringify(post), { status: 201 });
  } catch (error) {
    console.error("Error creating or updating post:", error);
    return new Response(JSON.stringify({ error: 'Failed to create or update post' }), { status: 500 });
  }
}
