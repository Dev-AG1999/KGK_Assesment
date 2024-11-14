// src/components/Preview.js
export default function Preview({ content }) {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }
  