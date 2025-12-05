"use client"
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Auto-scrolling horizontal slider with real swipe animation
export default function SubjectsScroll() {
  const slides = [
    { id: 1, content: <div className="w-full h-full maths flex items-center justify-center text-white text-2xl">
        MATHEMATICS
    </div> },
    { id: 2, content: <div className="w-full h-full english flex items-center justify-center text-white text-2xl">
        ENGLISH
    </div> },
    { id: 9, content: <div className="w-full h-full physics flex items-center justify-center text-white text-2xl">
        PHYSICS
    </div> },
        // { id: 3, content: <div className="w-full h-full maths flex items-center justify-center text-white text-2xl">
        //     WAEC
        // </div> },
        // { id: 4, content: <div className="w-full h-full maths flex items-center justify-center text-white text-2xl">
        //     WAEC
        // </div> },
        // { id: 10, content: <div className="w-full h-full maths flex items-center justify-center text-white text-2xl">
      //     WAEC
        // </div> },
        // { id: 5, content: <div className="w-full h-full maths flex items-center justify-center text-white text-2xl">
        //     WAEC
        // </div> },
        // { id: 6, content: <div className="w-full h-full maths flex items-center justify-center text-white text-2xl">
        //     WAEC
        // </div> },
        // { id: 11, content: <div className="w-full h-full maths flex items-center justify-center text-white text-2xl">
        //     WAEC
        // </div> },
        // { id: 7, content: <div className="w-full h-full maths flex items-center justify-center text-white text-2xl">
        //     WAEC
        // </div> },
        // { id: 8, content: <div className="w-full h-full maths flex items-center justify-center text-white text-2xl">
        //     WAEC
        // </div> },
        // { id: 12, content: <div className="w-full h-full maths flex items-center justify-center text-white text-2xl">
        //     WAEC
        // </div> },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-lg mx-auto">
      <AnimatePresence initial={false} custom={index}>
        <motion.div
          key={slides[index].id}
          className="absolute w-full h-full"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {slides[index].content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
