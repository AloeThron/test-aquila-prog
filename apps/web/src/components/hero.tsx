"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { fadeIn } from "../lib/variants";

export default function Hero() {
  const ctrls = useAnimation();

  const inView = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      ctrls.start("visible");
    }
    if (!inView) {
      ctrls.start("hidden");
    }
  }, [ctrls, inView]);

  return (
    <motion.section className="h-[50vh] lg:h-[53vh] flex flex-col pt-[150px] lg:pt-[350px] lg:py-200 items-center justify-center">
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="flex items-center flex-col justify-center gap-[40px]"
      >
        <motion.h1
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="font-semibold text-[34px] leading-[43.2px] md:leading-[57.6px] tracking-[0.2px] w-[85%] text-center text-black md:text-[48px] md:max-w-[800px] md:w-[75%] lg:text-[72px] lg:leading-[86.4px] lg:max-w-[900px]"
        >
          A brand and product designer working with clients globally
        </motion.h1>

        <motion.div
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="hidden md:flex gap-[10px] text-[14px] font-light"
        >
          <h4 className=" rounded-full py-[8px]">Expertise</h4>
          <h4 className="bg-[#e8e5e480] rounded-full py-[8px] px-[12px]">
            Branding
          </h4>
          <h4 className="bg-[#e8e5e480] rounded-full py-[8px] px-[12px]">
            Product
          </h4>
          <h4 className="bg-[#e8e5e480] rounded-full py-[8px] px-[12px]">
            Design Systems
          </h4>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
