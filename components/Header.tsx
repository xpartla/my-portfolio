'use client';

import React, {useState} from 'react';
import TagList from '@/components/TagList';

export default function Header() {
    const[searchQuery, setSearchQuery] = useState('');
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        //TODO: search / fiter logic implementation here
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
            <TagList onTagSelect={(tag) => setSearchQuery(tag)} />
        </header>
    );
}