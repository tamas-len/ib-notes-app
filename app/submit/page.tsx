"use client";

import { useState } from "react";

export default function SubmitPage() {

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [language, setLanguage] = useState("");
  const [content, setContent] = useState("");

  return (
    <main className="min-h-screen p-10">

      <h1 className="text-3xl font-bold mb-8">
        Submit Alternative Note
      </h1>


      <div className="flex flex-col gap-4 max-w-xl">


        <input
          className="border p-2"
          placeholder="Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />


        <input
          className="border p-2"
          placeholder="Subject"
          value={subject}
          onChange={(e)=>setSubject(e.target.value)}
        />


        <input
          className="border p-2"
          placeholder="Language"
          value={language}
          onChange={(e)=>setLanguage(e.target.value)}
        />


        <textarea
          className="border p-2 h-64"
          placeholder="Markdown content"
          value={content}
          onChange={(e)=>setContent(e.target.value)}
        />


        <button
          className="bg-black text-white p-3 rounded"
        >
          Submit
        </button>


      </div>

    </main>
  );
}