"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from "lucide-react";

interface CameraHistoryViewerProps {
  cameraName: string; // e.g. "w1", "w2", "w3"
  baseUrl?: string; // default: "https://www.vlekychotoun.cz/camera"
  historyCount?: number; // default: 216
  name: string;
  description?: string;
}

export default function CameraHistoryViewer({
  cameraName,
  baseUrl = "https://www.vlekychotoun.cz/camera",
  historyCount = 216,
  name,
  description,
}: CameraHistoryViewerProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(200); // ms per frame
  const [imageError, setImageError] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Construct image URL
  const getImageUrl = (frameNumber: number) => {
    return `${baseUrl}/${cameraName}-${frameNumber}.jpg`;
  };

  // Play/Pause functionality
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentFrame((prev) => {
          if (prev >= historyCount - 1) {
            setIsPlaying(false);
            return historyCount - 1;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, playbackSpeed, historyCount]);

  // Calculate time label (assuming images are ~5 minutes apart going backwards)
  const getTimeLabel = (frame: number) => {
    const minutesAgo = (historyCount - 1 - frame) * 5;
    if (minutesAgo < 60) {
      return `${minutesAgo} min ago`;
    }
    const hoursAgo = Math.floor(minutesAgo / 60);
    const remainingMins = minutesAgo % 60;
    return `${hoursAgo}h ${remainingMins}m ago`;
  };

  const handlePlayPause = () => {
    if (currentFrame >= historyCount - 1) {
      setCurrentFrame(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentFrame(0);
    setIsPlaying(false);
  };

  const handleSkipBack = () => {
    setCurrentFrame((prev) => Math.max(0, prev - 10));
  };

  const handleSkipForward = () => {
    setCurrentFrame((prev) => Math.min(historyCount - 1, prev + 10));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCurrentFrame(value);
    setIsPlaying(false);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
      {/* Image Display */}
      <div className="relative aspect-video bg-gray-900">
        {!imageError ? (
          <img
            src={getImageUrl(currentFrame)}
            alt={`${name} - Frame ${currentFrame}`}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
            key={currentFrame} // Force re-render on frame change
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            <div className="text-center">
              <p className="text-xl font-semibold mb-2">Camera Offline</p>
              <p className="text-sm opacity-75">Unable to load image</p>
            </div>
          </div>
        )}

        {/* Overlay Info */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2">
            <h3 className="font-display text-xl text-white">{name}</h3>
            {description && (
              <p className="text-sm text-white/80">{description}</p>
            )}
          </div>
          <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2">
            <p className="text-white font-mono text-sm">
              Frame {currentFrame + 1}/{historyCount}
            </p>
            <p className="text-white/80 text-xs">{getTimeLabel(currentFrame)}</p>
          </div>
        </div>

        {/* Live indicator when at latest frame */}
        {currentFrame === historyCount - 1 && (
          <div className="absolute top-4 right-1/2 transform translate-x-1/2">
            <div className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2 font-mono text-sm">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              LIVE
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
        {/* Timeline Slider */}
        <div className="mb-4">
          <input
            type="range"
            min="0"
            max={historyCount - 1}
            value={currentFrame}
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            style={{
              background: `linear-gradient(to right, #2563eb 0%, #2563eb ${
                (currentFrame / (historyCount - 1)) * 100
              }%, #e5e7eb ${(currentFrame / (historyCount - 1)) * 100}%, #e5e7eb 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Oldest</span>
            <span>Latest (Live)</span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleReset}
            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            title="Reset to start"
          >
            <RotateCcw className="w-5 h-5 text-gray-700" />
          </button>

          <button
            onClick={handleSkipBack}
            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            title="Skip back 10 frames"
          >
            <SkipBack className="w-5 h-5 text-gray-700" />
          </button>

          <button
            onClick={handlePlayPause}
            className="p-4 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white" />
            )}
          </button>

          <button
            onClick={handleSkipForward}
            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            title="Skip forward 10 frames"
          >
            <SkipForward className="w-5 h-5 text-gray-700" />
          </button>

          {/* Speed Control */}
          <div className="ml-4">
            <label className="text-sm text-gray-600 block mb-1">Speed</label>
            <select
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
              className="px-3 py-1 border rounded-lg text-sm"
            >
              <option value={500}>0.5x</option>
              <option value={200}>1x</option>
              <option value={100}>2x</option>
              <option value={50}>4x</option>
            </select>
          </div>
        </div>

        {/* Info */}
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            📹 {historyCount} frames • ~18 hours of history (5 min intervals)
          </p>
        </div>
      </div>
    </div>
  );
}
