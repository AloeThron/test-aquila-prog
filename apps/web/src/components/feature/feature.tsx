"use client";

import React, { useEffect, useState } from "react";

import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import Card from "./card";

type img = {
  id: string;
  url: string;
};

export default function Feature() {
  const ctrls = useAnimation();

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const [images, setImages] = useState<img[] | null>(null);

  useEffect(() => {
    if (inView) {
      ctrls.start("visible");
    }
    if (!inView) {
      ctrls.start("hidden");
    }
  }, [ctrls, inView]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(
          `https://api.thecatapi.com/v1/images/search?limit=10`,
          {
            cache: "no-store",
          }
        );
        const response = await res.json();
        setImages(response);
      } catch (err) {
        console.error(err);
        throw new Error("Failed");
      }
    }
    getData();
  }, []);

  console.log(images);

  const bodyAnimation = {
    hidden: {
      opacity: 0,
      y: `4em`,
    },
    visible: {
      opacity: 1,
      y: `0em`,
      transition: {
        delay: 0.5,
        duration: 1.5,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      className="flex flex-col pt-28 lg:pt-72 items-center justify-center pb-[20px] lg:pb-10"
    >
      <motion.div
        aria-hidden="true"
        initial="hidden"
        animate={ctrls}
        variants={bodyAnimation}
        className="grid w-[92%] max-w-[1320px] grid-cols-1 place-content-center place-items-center gap-x-5 gap-y-7 md:gap-y-10 md:grid-cols-2"
      >
        {images &&
          images.map((product, index) => {
            return <Card key={index} img={product.url} id={product.id} />;
          })}
      </motion.div>
    </motion.section>
  );
}
