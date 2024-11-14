import prisma from '../../../libs/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { id, title, content,slug } = await request.json();
    console.log("line 6",slug);
    
    const custom_slug = title.toLowerCase().replace(/\s+/g, '-'); // Simple slug generation

    const post = await prisma.post.upsert({
      where: {
        id: id || 0, // Use `id` if provided; otherwise use a dummy `id` (like `0`) to create a new post
      },
      update: {
        title,
        slug:slug? slug : custom_slug,
        content,
      },
      create: {
        title,
        slug: custom_slug,
        content,
      },
    });

    return NextResponse.json({
      message: "Posts fetched successfully",
      status: 200,
      success: true,

    });
  } catch (error) {
    console.error("Error creating or updating post:", error);
    return NextResponse.json({
      message: "There is some issue in connection",
      status: 500,
      success: false
    }, { status: 500 });
  }
}
