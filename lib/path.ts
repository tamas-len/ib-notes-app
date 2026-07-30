export function createCommunityPath({

    subject,
    topic,
    language,
    title
    
    }:{
    
    subject:string;
    topic:string;
    language:string;
    title:string;
    
    }){
    
    
    const clean = (value:string)=>
    
    value
    .replace(".md","")
    .replace(/[^a-zA-Z0-9-_ ]/g,"")
    .trim()
    .replace(/\s+/g,"-");
    
    
    
    return `${subject}/community/${clean(topic)}/${clean(language)}-${clean(title)}.md`;
    
    }