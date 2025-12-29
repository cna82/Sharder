"use client";
//imports

import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import shieldAnimation from "@/assets/lotties/shield.json";
import handshakeAnimation from "@/assets/lotties/handshake.json";
import supportAnimation from "@/assets/lotties/support.json";

// Hero section services comp 

const HeroSectionServices = ({ title }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  const badges = [
    {
      animation: shieldAnimation,
      label: "اطمینان و امنیت بالا",
      subText: "امنیت شما، اولویت ماست",
    },
    {
      animation: handshakeAnimation,
      label: "تعهد به مشتری",
      subText: "با ما، همراه مطمئن",
    },
    {
      animation: supportAnimation,
      label: "پشتیبانی دائمی",
      subText: "در هر زمان، کنارتان هستیم",
    },
  ];

  return (
    <Box
      component="section"
      className="relative md:mt-10  w-full h-auto min-h-[520px] sm:min-h-[580px] md:min-h-[620px] overflow-hidden flex flex-col justify-center items-center"
    >

      <Image
        src="/images/Services/background-trust-customer.png"
        alt="اعتماد مشتری"
        fill
        priority
        className="object-cover object-center z-0"
      />
      <Box className="absolute inset-0 z-0 bg-gradient-to-r from-teal-600/40 to-sky-500/40 backdrop-blur-sm" />

      <Box className="relative z-10 max-w-6xl px-6 flex flex-col justify-center items-center text-center w-full py-10">
        <Typography
          variant="h3"
          component="h1"
          className="font-DimaYekanBold !mb-10  text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-snug"
          sx={{
            textShadow:
              "3px 3px 10px rgba(14, 60, 120, 1), 0 0 15px rgba(14, 60, 120, 0.8), 0 0 25px rgba(14, 60, 120, 0.6)",
          }}
        >
          {title}
        </Typography>

        <Box className="flex flex-wrap justify-center items-stretch gap-10 w-full">
          {loading
            ? badges.map((_, idx) => (
              <Box
                key={idx}
                className="flex flex-col items-center gap-4 w-full sm:w-[220px] h-[280px] bg-white/25 backdrop-blur-md rounded-xl p-6 shadow-md"
              >
                <Box className="w-[100px] h-[100px] rounded-full bg-white/30 animate-pulse-fast" />
                <Box className="h-8 w-32 bg-white/30 rounded-md animate-pulse-fast" />
                <Box className="h-5 w-40 bg-white/20 rounded-md animate-pulse-fast" />
              </Box>
            ))
            : badges.map(({ animation, label, subText }, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.3, duration: 0.6 }}
                whileHover={{ scale: 1.08 }}
                className="flex flex-col items-center gap-3 w-full sm:w-[220px] h-[280px] bg-white/25 backdrop-blur-md rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Box className="w-[100px] h-[100px] rounded-full p-1.5 shadow-lg backdrop-blur-sm overflow-hidden">
                  <Lottie animationData={animation} loop autoplay />
                </Box>
                <Typography
                  variant="subtitle1"
                  className="font-DimaYekanBold  text-black text-xl text-center"
                >
                  {label}
                </Typography>
                <Typography
                  variant="body2"
                  className="font-DimaYekanBold  text-black/80 text-base text-center"
                >
                  {subText}
                </Typography>
              </motion.div>
            ))}
        </Box>
      </Box>

      <style jsx global>{`
        .animate-pulse-fast {
          animation: pulse 0.7s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
        }
      `}</style>
    </Box>
  );
}

export default HeroSectionServices;