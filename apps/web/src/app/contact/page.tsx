"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { motion } from "framer-motion";

import { fadeIn } from "../../lib/variants";

export default function Contact() {
  const path = usePathname();
  return (
    <section className="container mx-auto relative">
      {path === "/contact" ? (
        <div className="relative h-screen flex flex-col items-center justify-center text-[35px] md:text-[45px] lg:text-[70px] font-semibold tracking-wide -top-[50px] md:-top-[25px] lg:-top-[0px] -mb-[215px] md:-mb-[110px]">
          <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.2 }}
          >
            Let's work together.
          </motion.div>
          <motion.div
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.2 }}
            className="text-[#7f7f7f] hover:text-[#7f7f7f]/50 cursor-pointer -mt-3"
          >
            Get in touch.
          </motion.div>
        </div>
      ) : (
        <div className="h-[40vh] md:h-[50vh] flex flex-col items-center justify-center text-[30px] md:text-[35px] font-semibold tracking-wide">
          <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.2 }}
          >
            Let's work together.
          </motion.div>
          <motion.div
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.2 }}
            className="text-[#7f7f7f] hover:text-[#7f7f7f]/50 cursor-pointer -mt-2"
          >
            Get in touch.
          </motion.div>
        </div>
      )}
    </section>
  );
}
