'use client';

import React, {useState} from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion
import TagList from '@/components/TagList';
import {useRouter} from 'next/navigation';

export default function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false); // Track focus state
    const router = useRouter();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchQuery = event.target.value;
        setSearchQuery(newSearchQuery);
        updateQueryParams('search', newSearchQuery);
    };

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handleTagSelect = (tag: string) => {
        setSearchQuery(tag);
        updateQueryParams('tag', tag);
    };

    const updateQueryParams = (key: string, value: string) => {
        const params = new URLSearchParams(window.location.search);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`gallery/?${params.toString()}`);
    };

    return (
        <header className={"my-4 row align-items-center pt-5"}>
            <div className={"logo col-md-2 text-center"}>
                <p>test</p>
            </div>

            <div className={"col-md-8 d-flex justify-content-center"}>
                <motion.div
                    className={"input-group mb-3 search-bar w-100"}
                    initial={{ scale: 1 }}
                    animate={{ scale: isFocused ? 1.1 : 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20, mass: 2 }}
                >
                    <input
                        type="text"
                        className="form-control bg-black text-white shadow-none"
                        placeholder="Search images..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </motion.div>
            </div>
            <div className={"col-md-2"}></div>
            <TagList onTagSelect={handleTagSelect} />
        </header>
    );
}
