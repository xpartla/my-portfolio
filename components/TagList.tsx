'use client';

import { motion } from "framer-motion";
import React, {useState, useEffect} from "react";
import {FaChevronDown, FaChevronUp } from "react-icons/fa"

export default function TagList({onTagSelect}:{onTagSelect:(tag:string)=>void}) {
    const [tags, setTags] = useState<string[]>([]);
    const [visibleTags, setVisibleTags] = useState<number>(0);
    const [windowWidth, setWindowWidth] = useState<number>(0);
    const [showAllTags, setShowAllTags] = useState<boolean>(false);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await fetch("/api/tags");
                const json = await response.json();
                setTags(json.map((tag: {name:string}) => tag.name));
                updateVisibleTags(window.innerWidth);
            }
            catch (err){
                console.log("Failed to fetch tags.", err);
            }
        };
        fetchTags();
        setWindowWidth(window.innerWidth);
        const handleResize = () =>{
            setWindowWidth(window.innerWidth);
            updateVisibleTags(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () =>window.removeEventListener("resize", handleResize);
    }, []);

    const updateVisibleTags = (width: number) => {
        if(width <= 769){
            setVisibleTags(6);
        }
        else{
            setVisibleTags(10)
        }
    };

    const toggleTagVisibility = () => {
        if(showAllTags) {
            updateVisibleTags(windowWidth);
        }
        else{
            setVisibleTags(tags.length);
        }
        setShowAllTags(!showAllTags);
    }

    return(
        <div className={"row mb-3 pt-3"}>
            <svg width="0" height="0">
                <defs>
                    <linearGradient id="gradient-arrow-up" x1="100%" y1="100%" x2="0%" y2="0%">
                        <stop stopColor="#FF5370" offset="0%" />
                        <stop stopColor="#F76D47" offset="20%" />
                        <stop stopColor="#F9AA33" offset="40%" />
                        <stop stopColor="#FCD02D" offset="60%" />
                        <stop stopColor="#31A8FF" offset="80%" />
                        <stop stopColor="#9C27B0" offset="100%" />
                    </linearGradient>
                </defs>
            </svg>
            <svg width="0" height="0">
                <defs>
                    <linearGradient id="gradient-arrow-down" x1="100%" y1="100%" x2="0%" y2="0%">
                        <stop stopColor="#9C27B0" offset="0%" />
                        <stop stopColor="#31A8FF" offset="20%" />
                        <stop stopColor="#FCD02D" offset="40%" />
                        <stop stopColor="#F9AA33" offset="60%" />
                        <stop stopColor="#F76D47" offset="80%" />
                        <stop stopColor="#FF5370" offset="100%" />
                    </linearGradient>
                </defs>
            </svg>
            <div className={"col-md-2"} />
            <div className={"d-flex flex-wrap column-gap-3 row-gap-3 col-md-8 tags justify-content-center"}>
                {tags.slice(0, visibleTags).map(tag => (
                    <motion.button
                        whileHover={{scale:1.1}}
                        whileTap={{scale: 0.95}}
                        key={tag}
                        className={"btn-custom"}
                        onClick={() => onTagSelect(tag)}
                    >
                        {tag}
                    </motion.button>
                ))}
            </div>
            <div className={"col-md-2"} />
            {tags.length > visibleTags && !showAllTags && (
                <div className="d-flex justify-content-center mt-4">
                    <motion.div
                        whileHover={{ scale: 1.5 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10, mass: 1.4 }}
                        onClick={toggleTagVisibility}
                    >
                        <FaChevronDown size={50} style={{ fill: 'url(#gradient-arrow-down)', cursor: 'pointer' }} />
                    </motion.div>
                </div>
            )}
            {showAllTags && (
                <div className="d-flex justify-content-center mt-4">
                    <motion.div
                        whileHover={{ scale: 1.5 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10, mass: 1.4 }}
                        onClick={toggleTagVisibility}
                    >
                        <FaChevronUp size={50} style={{ fill: 'url(#gradient-arrow-up)', cursor: 'pointer' }} />
                    </motion.div>
                </div>
            )}        </div>
    );
}