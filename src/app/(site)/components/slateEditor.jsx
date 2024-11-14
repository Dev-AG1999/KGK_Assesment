import React, { useMemo } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';

const SlateEditor = ({ value = [{ type: 'paragraph', children: [{ text: '' }] }], onChange }) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Slate editor={editor} value={value} onChange={(newValue) => onChange(newValue)}>
      <Editable
        placeholder="Enter some rich text..."
        renderLeaf={(props) => <Leaf {...props} />}
        renderElement={(props) => <Element {...props} />}
      />
    </Slate>
  );
}

// Helper functions for rendering different types of content
const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'heading':
      return <h2 {...attributes}>{children}</h2>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  return <span {...attributes} style={{ fontWeight: leaf.bold ? 'bold' : 'normal' }}>{children}</span>;
};

export default SlateEditor;
