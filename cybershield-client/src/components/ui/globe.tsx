"use client";
import { cn } from "@/lib/utils";
import createGlobe from "cobe";
import type React from "react";
import { useEffect, useRef } from "react";

type Marker = { location: [number, number]; size: number };

/** Representative regions served — swap for real client locations when known. */
const defaultMarkers: Marker[] = [
  { location: [19.076, 72.8777], size: 0.09 }, // Mumbai
  { location: [28.6139, 77.209], size: 0.07 }, // Delhi
  { location: [25.2048, 55.2708], size: 0.07 }, // Dubai
  { location: [51.5072, -0.1276], size: 0.08 }, // London
  { location: [52.52, 13.405], size: 0.06 }, // Berlin
  { location: [40.7128, -74.006], size: 0.08 }, // New York
  { location: [37.7749, -122.4194], size: 0.07 }, // San Francisco
  { location: [1.3521, 103.8198], size: 0.07 }, // Singapore
  { location: [-33.8688, 151.2093], size: 0.06 }, // Sydney
  { location: [-23.5505, -46.6333], size: 0.06 }, // São Paulo
];

interface EarthProps {
  className?: string;
  theta?: number;
  dark?: number;
  scale?: number;
  diffuse?: number;
  mapSamples?: number;
  mapBrightness?: number;
  baseColor?: [number, number, number];
  markerColor?: [number, number, number];
  glowColor?: [number, number, number];
  markers?: Marker[];
}

const Earth: React.FC<EarthProps> = ({
  className,
  theta = 0.25,
  dark = 1,
  scale = 1.1,
  diffuse = 1.2,
  mapSamples = 40000,
  mapBrightness = 6,
  baseColor = [0.28, 0.45, 0.85],
  markerColor = [0.45, 0.78, 1],
  glowColor = [0.2, 0.42, 0.78],
  markers = defaultMarkers,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let width = 0;
    const onResize = () => {
      if (canvasRef.current) width = canvasRef.current.offsetWidth;
    };
    window.addEventListener("resize", onResize);
    onResize();

    let phi = 0;
    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: theta,
      dark: dark,
      scale: scale,
      diffuse: diffuse,
      mapSamples: mapSamples,
      mapBrightness: mapBrightness,
      baseColor: baseColor,
      markerColor: markerColor,
      glowColor: glowColor,
      opacity: 1,
      offset: [0, 0],
      markers: markers,
    });

    let animationFrameId: number;
    const animate = () => {
      phi += 0.003;
      globe.update({ phi });
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={cn(
        "z-10 mx-auto flex w-full max-w-[350px] items-center justify-center",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          aspectRatio: "1",
        }}
      />
    </div>
  );
};

export default Earth;
