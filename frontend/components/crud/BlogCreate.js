import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
import { createBlog } from '../../actions/blog';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function BlogCreate() {
  const router = useRouter();
  return (
    <>
      <h2>create blog form</h2>
      {JSON.stringify(router)}
    </>
  );
}
