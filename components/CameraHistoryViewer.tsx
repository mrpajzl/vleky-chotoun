"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Maximize, Minimize } from "lucide-react";

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
  const [playbackSpeed, setPlaybackSpeed] = useState(400); // ms per frame (slower default)
  const [imageError, setImageError] = useState(false);
  const [isLoadingFrame, setIsLoadingFrame] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const preloadedImageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Construct image URL
  const getImageUrl = (frameNumber: number) => {
    return `${baseUrl}/${cameraName}-${frameNumber}.jpg`;
  };

  // Preload next image
  const preloadImage = (frameNumber: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        preloadedImageRef.current = img;
        resolve();
      };
      img.onerror = reject;
      img.src = getImageUrl(frameNumber);
    });
  };

  // Play/Pause functionality with preloading
  useEffect(() => {
    if (isPlaying) {
      const advanceFrame = async () => {
        const nextFrame = currentFrame + 1;
        
        if (nextFrame >= historyCount) {
          setIsPlaying(false);
          return;
        }

        setIsLoadingFrame(true);
        
        try {
          // Preload next image before advancing
          await preloadImage(nextFrame);
          setCurrentFrame(nextFrame);
          setImageError(false);
        } catch (error) {
          console.error('Failed to load image:', error);
          setImageError(true);
          setIsPlaying(false);
        } finally {
          setIsLoadingFrame(false);
        }
      };

      intervalRef.current = setInterval(advanceFrame, playbackSpeed);
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
  }, [isPlaying, playbackSpeed, currentFrame, historyCount]);

  // Calculate time label (images are 10 minutes apart going backwards)
  const getTimeLabel = (frame: number) => {
    const minutesAgo = (historyCount - 1 - frame) * 10;
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

  const handleSkipBack = async () => {
    const newFrame = Math.max(0, currentFrame - 10);
    setIsLoadingFrame(true);
    try {
      await preloadImage(newFrame);
      setCurrentFrame(newFrame);
      setImageError(false);
    } catch (error) {
      setImageError(true);
    } finally {
      setIsLoadingFrame(false);
    }
  };

  const handleSkipForward = async () => {
    const newFrame = Math.min(historyCount - 1, currentFrame + 10);
    setIsLoadingFrame(true);
    try {
      await preloadImage(newFrame);
      setCurrentFrame(newFrame);
      setImageError(false);
    } catch (error) {
      setImageError(true);
    } finally {
      setIsLoadingFrame(false);
    }
  };

  const handleSliderChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setIsPlaying(false);
    setIsLoadingFrame(true);
    try {
      await preloadImage(value);
      setCurrentFrame(value);
      setImageError(false);
    } catch (error) {
      setImageError(true);
    } finally {
      setIsLoadingFrame(false);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      // Enter fullscreen
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`bg-white rounded-2xl overflow-hidden shadow-xl ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''}`}
    >
      {/* Image Display */}
      <div className={`relative bg-gray-900 ${isFullscreen ? 'h-[calc(100vh-200px)]' : 'aspect-video'}`}>
        {!imageError ? (
          <>
            <img
              src={getImageUrl(currentFrame)}
              alt={`${name} - Frame ${currentFrame}`}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
              key={currentFrame} // Force re-render on frame change
            />
            {isLoadingFrame && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="bg-white/90 rounded-lg px-4 py-2 flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm font-medium">Loading...</span>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            <div className="text-center">
              <p className="text-xl font-semibold mb-2">Camera Offline</p>
              <p className="text-sm opacity-75">Unable to load image</p>
            </div>
          </div>
        )}

        {/* Overlay Info */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start gap-2">
          <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2">
            <h3 className="font-display text-xl text-white">{name}</h3>
            {description && (
              <p className="text-sm text-white/80">{description}</p>
            )}
          </div>
          <div className="flex gap-2">
            <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2">
              <p className="text-white font-mono text-sm">
                Frame {currentFrame + 1}/{historyCount}
              </p>
              <p className="text-white/80 text-xs">{getTimeLabel(currentFrame)}</p>
            </div>
            <button
              onClick={toggleFullscreen}
              className="bg-black/60 backdrop-blur-sm rounded-lg p-3 hover:bg-black/80 transition-colors"
              title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <Minimize className="w-5 h-5 text-white" />
              ) : (
                <Maximize className="w-5 h-5 text-white" />
              )}
            </button>
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
            disabled={isLoadingFrame}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
            disabled={isLoadingFrame}
            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Reset to start"
          >
            <RotateCcw className="w-5 h-5 text-gray-700" />
          </button>

          <button
            onClick={handleSkipBack}
            disabled={isLoadingFrame}
            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Skip back 10 frames"
          >
            <SkipBack className="w-5 h-5 text-gray-700" />
          </button>

          <button
            onClick={handlePlayPause}
            disabled={isLoadingFrame}
            className="p-4 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
            disabled={isLoadingFrame}
            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
              <option value={800}>0.5x</option>
              <option value={400}>1x</option>
              <option value={200}>2x</option>
              <option value={100}>4x</option>
            </select>
          </div>
        </div>

        {/* Info */}
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            📹 {historyCount} frames • ~{Math.round((historyCount * 10) / 60)} hours of history (10 min intervals)
          </p>
          {isLoadingFrame && (
            <p className="text-blue-600 mt-1">Loading image...</p>
          )}
        </div>
      </div>
    </div>
  );
}
