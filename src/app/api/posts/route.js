// src/app/api/posts/route.js

import prisma from '../../libs/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({

      
    });

    console.log("line 13",posts);
    
    return NextResponse.json({
      message: "Posts fetched successfully",
      status: 200,
      success: true,
      data: posts
    });
  } catch (error) {
    return NextResponse.json({
      message: "There is some issue in connection",
      status: 500,
      success: false
    }, { status: 500 });
  }
}
