'use client';

import React from "react";

const tags = ['Film', 'Digital', 'Nature', 'Portraits', 'Street', 'Black and White']

export default function TagList({onTagSelect}:{onTagSelect:(tag:string)=>void}) {
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