"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import Youtube from "@tiptap/extension-youtube";
import { FaBold, FaItalic, FaUnderline, FaStrikethrough, FaListUl, FaListOl, FaQuoteLeft, FaCode, FaImage, FaUndo, FaRedo, FaHeading, FaYoutube } from "react-icons/fa";

const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      Heading.configure({ levels: [1, 2, 3] }),
      Link.configure({ openOnClick: true }),
      ListItem,
      BulletList,
      OrderedList,
      Blockquote,
      CodeBlock,
      Youtube.configure({ width: 560, height: 315 }),
    ],
    content: "<p>Start writing...</p>",
  });

  // Handle Image Upload
  const handleImageUpload = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  // Handle YouTube Embed
  const handleYouTubeEmbed = () => {
    const url = prompt("Enter YouTube URL:");
    if (url) {
      editor.chain().focus().setYoutubeVideo({ src: url }).run();
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg p-6 mt-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Google Docs-Style Editor</h2>

      {/* Toolbar */}
      {editor && (
        <div className="sticky top-0 bg-white z-10 flex flex-wrap gap-3 p-3 border-b shadow-sm rounded-t-lg">
          <button onClick={() => editor.chain().focus().toggleBold().run()} className="toolbar-btn"><FaBold /></button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()} className="toolbar-btn"><FaItalic /></button>
          <button onClick={() => editor.chain().focus().toggleUnderline().run()} className="toolbar-btn"><FaUnderline /></button>
          <button onClick={() => editor.chain().focus().toggleStrike().run()} className="toolbar-btn"><FaStrikethrough /></button>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className="toolbar-btn"><FaHeading className="text-lg" />1</button>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="toolbar-btn"><FaHeading className="text-lg" />2</button>
          <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="toolbar-btn"><FaListUl /></button>
          <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className="toolbar-btn"><FaListOl /></button>
          <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className="toolbar-btn"><FaQuoteLeft /></button>
          <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className="toolbar-btn"><FaCode /></button>
          <button onClick={handleImageUpload} className="toolbar-btn"><FaImage /></button>
          <button onClick={handleYouTubeEmbed} className="toolbar-btn"><FaYoutube /></button>
          <button onClick={() => editor.chain().focus().undo().run()} className="toolbar-btn"><FaUndo /></button>
          <button onClick={() => editor.chain().focus().redo().run()} className="toolbar-btn"><FaRedo /></button>
        </div>
      )}

      {/* Editor */}
      <div className="border p-6 rounded-lg min-h-[500px] bg-gray-50 shadow-md mt-4 text-lg leading-relaxed">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
