"use client";

import { useEffect, useState } from "react";


type Item = {
  name: string;
  path: string;
  type: string;
};


export default function Home() {

  const [subjects, setSubjects] = useState<Item[]>([]);
  const [topics, setTopics] = useState<Item[]>([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [type, setType] = useState("alternative");
  const [language, setLanguage] = useState("English");
  const [content, setContent] = useState("");

  const [title, setTitle] = useState("");

  async function submitNote(){

    console.log({
      subject:selectedSubject,
      topic:selectedTopic,
      type,
      language,
      title,
      content
    });
  
  }

  useEffect(() => {

    fetch("/api/content?path=content/ib")
      .then(res => res.json())
      .then(data => {
        setSubjects(data);
      });

  }, []);



  function loadTopics(path:string){

    setSelectedSubject(path);

    fetch(`/api/content?path=${path}`)
      .then(res=>res.json())
      .then(data=>{
        setTopics(
          data.filter(
            (item:Item)=>item.type==="file"
          )
        );
      });

  }



  return (
    <main className="min-h-screen p-10 bg-white text-black">

      <h1 className="text-3xl font-bold mb-8">
        Submit IB Note
      </h1>


      <label>
        Subject
      </label>

      <select
        className="border p-2 block mb-8 rounded bg-white text-black"
        onChange={(e)=>
          loadTopics(e.target.value)
        }
      >

        <option>
          Select subject
        </option>


        {subjects.map(subject=>(

          <option
            key={subject.path}
            value={subject.path}
          >
            {subject.name}
          </option>

        ))}


      </select>



      <label>
        Topic
      </label>


      <select
        className="border p-2 block rounded bg-white text-black"
        onChange={(e)=>
          setSelectedTopic(e.target.value)
        }
      >

        <option>
          Select topic
        </option>


        {topics.map(topic=>(

          <option
            key={topic.path}
            value={topic.path}
          >
            {topic.name.replace(".md","")}
          </option>

        ))}


      </select>

      <div className="mt-8">

      <label>
      Contribution type
      </label>


      <select
      className="border p-2 block rounded bg-white text-black"
      value={type}
      onChange={(e)=>
      setType(e.target.value)
      }
      >

      <option value="alternative">
      Alternative explanation
      </option>

      <option value="translation">
      Translation
      </option>

      <option value="exam-tips">
      Exam tips
      </option>

      <option value="summary">
      Summary
      </option>


      </select>

      </div>

      <div className="mt-8">

      <label>
      Language
      </label>


      <select
      className="border p-2 block rounded bg-white text-black"
      value={language}
      onChange={(e)=>
      setLanguage(e.target.value)
      }
      >

      <option>
      English
      </option>

      <option>
      Hungarian
      </option>

      <option>
      German
      </option>


      </select>


      </div>

      <div className="mt-8">

      <label>
      Title
      </label>


      <input

      className="border p-2 block w-full rounded bg-white text-black"

      value={title}

      onChange={(e)=>
      setTitle(e.target.value)
      }

      />


      </div>

      <div className="mt-8">

      <label>
      Note content (Markdown)
      </label>


      <textarea

      className="
      border 
      p-2 
      block 
      w-full 
      h-64
      rounded
      bg-white
      text-black
      "

      value={content}

      onChange={(e)=>
      setContent(e.target.value)
      }

      />


      </div>

      <div>
        <button

        onClick={submitNote}

        className="
        mt-8
        bg-black
        text-white
        px-6
        py-3
        rounded
        "

        >
        Submit Note

        </button>
      </div>
    </main>
  );
}