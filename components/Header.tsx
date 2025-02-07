'use client';

import React, {useState} from 'react';
import TagList from '@/components/TagList';
import {useRouter} from 'next/navigation';

export default function Header() {
    const[searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchQuery = event.target.value;
        setSearchQuery(newSearchQuery);
        updateQueryParams('search', newSearchQuery);
    };

    const handleTagSelect = (tag:string) => {
        setSearchQuery(tag);
        updateQueryParams('tag', tag);
    };

    const updateQueryParams = (key: string, value: string) => {
        const params = new URLSearchParams(window.location.search);
        if (value){
            params.set(key, value);
        }
        else{
            params.delete(key);
        }
        router.push(`gallery/?${params.toString()}`);
    };

    return (
        <header className={"my-4"}>
            <div className={"input-group mb-3"}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search images..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <TagList onTagSelect={handleTagSelect} />
        </header>
    );
}