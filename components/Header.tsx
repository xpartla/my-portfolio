'use client';

import React, {useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import TagList from '@/components/TagList';
import {useRouter} from 'next/navigation';
import Image from   'next/image';
import Link from 'next/link';

export default function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsLargeScreen(width > 1212 || width < 769);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

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
            <div className={"container-fluid col-md-2 text-center pb-3"}>
                <motion.div
                    initial = {{x:0}}
                    animate = {{x: isFocused && isLargeScreen ? 50 : 0}}
                    transition = {{type: "spring", stiffness: "300", damping: 20}}
                    className = {"logo-container"}
                >
                    <Link
                        href={"/"}
                    >
                        <Image
                            src="/logo/logo-only.svg"
                            alt="logo"
                            width={35}
                            height={35}
                            className={"logo-fix"}
                        />
                    </Link>
                    <motion.span
                        className={"logo-text"}
                        initial = {{opacity: 1}}
                        animate = {{opacity: isFocused && isLargeScreen ? 0 : 1}}
                        transition = {{duration: 0.3}}
                    >
                    grep.photo
                </motion.span>
                </motion.div>
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
