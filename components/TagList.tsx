'use client';

import React, {useState, useEffect} from "react";

export default function TagList({onTagSelect}:{onTagSelect:(tag:string)=>void}) {
    const [tags, setTags] = useState<string[]>([]);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await fetch("/api/tags");
                const json = await response.json();
                setTags(json.map((tag: {name:string}) => tag.name));
            }
            catch (err){
                console.log("Failed to fetch tags.", err);
            }
        };
        fetchTags();
    }, []);

    return(
        <div className={"d-flex flex-wrap gap-2 mb-3"}>
            {tags.map(tag => (
                <button
                    key={tag}
                    className={"btn btn-outline-primary"}
                    onClick={() => onTagSelect(tag)}
                >
                    {tag}
                </button>
            ))}
        </div>
    );
}