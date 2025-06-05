"use client";

import { useState, useRef, useEffect } from "react";
import {
	Play,
	Pause,
	SkipBack,
	SkipForward,
	Volume2,
	VolumeX,
	Repeat,
	Shuffle,
	ListMusic,
	Maximize2,
	Minimize2,
	X,
	Heart,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import playlist from "@/lib/playlist"; // Assuming you have a playlist data file
import { useIsMobile } from "@/hooks/use-mobile";

export function MusicPlayer({ inner = true }: { inner?: boolean }) {
	const [expanded, setExpanded] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTrack, setCurrentTrack] = useState(playlist[0]);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(0.7);
	const [isMuted, setIsMuted] = useState(false);
	const [isShuffled, setIsShuffled] = useState(false);
	const [repeatMode, setRepeatMode] = useState(0); // 0: no repeat, 1: repeat all, 2: repeat one
	const [favorites, setFavorites] = useState<string[]>([]);
	const [showPlayer, setShowPlayer] = useState(true);
	const isMobile = useIsMobile();
	const audioRef = useRef<HTMLAudioElement>(null);
	const progressBarRef = useRef<HTMLDivElement>(null);

	// Toggle expanded view
	const toggleExpanded = () => {
		setExpanded(!expanded);
	};

	// Toggle player visibility
	const togglePlayerVisibility = () => {
		setShowPlayer(!showPlayer);
	};

	// Format time in MM:SS
	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
	};

	// Play/pause toggle
	const togglePlay = () => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause();
			} else {
				audioRef.current.play();
			}
			setIsPlaying(!isPlaying);
		}
	};

	// Skip to next track
	const nextTrack = () => {
		const currentIndex = playlist.findIndex(
			(track) => track.id === currentTrack.id
		);
		const nextIndex = (currentIndex + 1) % playlist.length;
		setCurrentTrack(playlist[nextIndex]);
		setCurrentTime(0);

		// If already playing, ensure the next track plays automatically
		if (isPlaying && audioRef.current) {
			setTimeout(() => {
				audioRef.current?.play();
			}, 100);
		}
	};

	// Skip to previous track
	const prevTrack = () => {
		const currentIndex = playlist.findIndex(
			(track) => track.id === currentTrack.id
		);
		const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
		setCurrentTrack(playlist[prevIndex]);
		setCurrentTime(0);

		// If already playing, ensure the previous track plays automatically
		if (isPlaying && audioRef.current) {
			setTimeout(() => {
				audioRef.current?.play();
			}, 100);
		}
	};

	// Handle time update
	const handleTimeUpdate = () => {
		if (audioRef.current) {
			setCurrentTime(audioRef.current.currentTime);
		}
	};

	// Handle track ended
	const handleTrackEnded = () => {
		if (repeatMode === 2) {
			// Repeat one
			if (audioRef.current) {
				audioRef.current.currentTime = 0;
				audioRef.current.play();
			}
		} else {
			// Go to next track (repeat all will naturally loop through playlist)
			nextTrack();
		}
	};

	// Handle seeking
	const handleSeek = (value: number[]) => {
		if (audioRef.current) {
			audioRef.current.currentTime = value[0];
			setCurrentTime(value[0]);
		}
	};

	// Handle volume change
	const handleVolumeChange = (value: number[]) => {
		const newVolume = value[0];
		setVolume(newVolume);

		if (audioRef.current) {
			audioRef.current.volume = newVolume;
		}

		if (newVolume === 0) {
			setIsMuted(true);
		} else {
			setIsMuted(false);
		}
	};

	// Toggle mute
	const toggleMute = () => {
		if (audioRef.current) {
			if (isMuted) {
				audioRef.current.volume = volume;
				setIsMuted(false);
			} else {
				audioRef.current.volume = 0;
				setIsMuted(true);
			}
		}
	};

	// Toggle shuffle
	const toggleShuffle = () => {
		if (!isShuffled) {
			const currentIndex = playlist.findIndex(
				(track) => track.id === currentTrack.id
			);
			const shuffledPlaylist = [...playlist];
			for (let i = shuffledPlaylist.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[shuffledPlaylist[i], shuffledPlaylist[j]] = [
					shuffledPlaylist[j],
					shuffledPlaylist[i],
				];
			}
			setCurrentTrack(shuffledPlaylist[currentIndex]);
		} else {
			setCurrentTrack(playlist[0]);
		}
		setIsShuffled(!isShuffled);
	};

	// Toggle repeat mode
	const toggleRepeat = () => {
		setRepeatMode((repeatMode + 1) % 3);
	};

	// Toggle favorite
	const toggleFavorite = (trackId: string) => {
		if (favorites.includes(trackId)) {
			setFavorites(favorites.filter((id) => id !== trackId));
		} else {
			setFavorites([...favorites, trackId]);
		}
	};

	// Play a specific track
	const playTrack = (track: (typeof playlist)[0]) => {
		setCurrentTrack(track);
		setCurrentTime(0);
		setIsPlaying(true);

		if (audioRef.current) {
			setTimeout(() => {
				audioRef.current?.play();
			}, 100);
		}
	};

	// Load metadata when track changes
	useEffect(() => {
		if (audioRef.current) {
			const handleLoadedMetadata = () => {
				setDuration(audioRef.current?.duration || 0);
			};

			audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);

			return () => {
				audioRef.current?.removeEventListener(
					"loadedmetadata",
					handleLoadedMetadata
				);
			};
		}
	}, [currentTrack]);

	// Set up audio element
	useEffect(() => {
		if (audioRef.current) {
			// Set initial volume
			audioRef.current.volume = volume;

			// Add event listeners
			audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
			audioRef.current.addEventListener("ended", handleTrackEnded);

			return () => {
				audioRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
				audioRef.current?.removeEventListener("ended", handleTrackEnded);
			};
		}
	}, [repeatMode]);

	return (
		<>
			{/* Toggle button when player is hidden */}
			{!showPlayer && (
				<button
					onClick={togglePlayerVisibility}
					className={cn(
						"fixed bottom-4 md:bottom-4 right-4 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all",
						!inner && "bottom-20"
					)}
					aria-label="Show music player"
				>
					<ListMusic className="h-5 w-5" />
				</button>
			)}

			{/* Main player container */}
			<div
				className={cn(
					"bottom-0 md:bottom-0 left-0 right-0 z-50 flex flex-col bg-background text-primary transition-all shadow-2xl duration-300 ease-in-out",
					expanded && "w-full h-[calc(100vh-4rem)]",
					showPlayer ? "translate-x-0" : "translate-x-full",
					!inner ? "fixed bottom-16" : "absolute",
					!inner && !isMobile && "hidden"
				)}
			>
				{/* Hidden audio element */}
				<audio ref={audioRef} src={currentTrack.audioSrc} preload="metadata" />

				{/* Expanded view header */}
				{expanded && (
					<div className="flex items-center justify-between p-4 border-b border-border">
						<h3 className="font-bold">Now Playing</h3>
						<div className="flex items-center gap-2">
							<Button
								variant="ghost"
								size="icon"
								onClick={toggleExpanded}
								className=""
							>
								<Minimize2 className="h-5 w-5" />
							</Button>
							<Button
								variant="ghost"
								size="icon"
								onClick={togglePlayerVisibility}
								className=""
							>
								<X className="h-5 w-5" />
							</Button>
						</div>
					</div>
				)}

				{/* Expanded view content */}
				{expanded && (
					<div className="flex-1 flex flex-col p-4 overflow-hidden">
						{/* Current track info with larger artwork */}
						<div className="flex flex-col items-center mb-4">
							<div className="relative w-48 h-48 mb-4">
								<Image
									src={currentTrack.cover}
									alt={`${currentTrack.title} album art`}
									fill
									className="object-cover rounded-md shadow-lg"
								/>
							</div>
							<div className="text-center">
								<h3 className="font-bold text-lg">{currentTrack.title}</h3>
								<p className="text-card-foreground">{currentTrack.artist}</p>
								<p className="text-card-foreground/60 text-sm">
									{currentTrack.album}
								</p>
							</div>
						</div>

						{/* Playlist */}
						<div className="flex-1">
							<h4 className="font-semibold mb-2">Up Next</h4>
							<ScrollArea className="h-40 md:h-48 w-full rounded-md border">
								<div className="space-y-0">
									{playlist.map((track) => (
										<div
											key={track.id}
											onClick={() => playTrack(track)}
											className={cn(
												"flex items-center p-2 rounded-md hover:bg-accent cursor-pointer group",
												currentTrack.id === track.id ? "bg-secondary" : ""
											)}
										>
											<div className="relative w-10 h-10 mr-3 flex-shrink-0">
												<Image
													src={track.cover}
													alt={`${track.title} album art`}
													fill
													className="object-cover rounded"
												/>
												{currentTrack.id === track.id && isPlaying && (
													<div className="absolute inset-0 flex items-center justify-center bg-background/40 rounded">
														<span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
													</div>
												)}
											</div>
											<div className="flex-1 min-w-0">
												<p
													className={cn(
														"truncate font-medium",
														currentTrack.id === track.id ? "text-primary" : ""
													)}
												>
													{track.title}
												</p>
												<p className="text-sm text-card-foreground/60 truncate">
													{track.artist}
												</p>
											</div>
											<div className="flex items-center">
												<Button
													variant="ghost"
													size="icon"
													className="opacity-0 group-hover:opacity-100 text-destructive hover:text-pink-600"
													onClick={(e) => {
														e.stopPropagation();
														toggleFavorite(track.id);
													}}
												>
													{favorites.includes(track.id) ? (
														<Heart className="h-4 w-4 fill-primary text-primary" />
													) : (
														<Heart className="h-4 w-4" />
													)}
												</Button>
												<span className="text-xs text-card-foreground w-10 ">
													{formatTime(track.duration)}
												</span>
											</div>
										</div>
									))}
								</div>
							</ScrollArea>
						</div>
					</div>
				)}

				{/* Mini player (always visible) */}
				<div
					className={cn(
						"flex items-center p-4 bg-background",
						expanded ? "border-t border-border" : ""
					)}
				>
					{/* Track info with small artwork */}
					<div className="flex items-center flex-1 min-w-0 mr-4">
						<div className="relative size-6 md:w-12 md:h-12 mr-3 flex-shrink-0">
							<Image
								src={currentTrack.cover}
								alt={`${currentTrack.title} album art`}
								fill
								className="object-cover rounded"
							/>
						</div>
						{!expanded && (
							<div className="flex-1 min-w-0">
								<p className="font-medium truncate">{currentTrack.title}</p>
								<p className="text-sm truncate">{currentTrack.artist}</p>
							</div>
						)}
					</div>

					{/* Controls */}
					<div className="flex items-center gap-1 sm:gap-2">
						<Button variant="ghost" size="icon" onClick={prevTrack}>
							<SkipBack className="h-5 w-5" />
						</Button>

						<Button
							variant="ghost"
							size="icon"
							onClick={togglePlay}
							className="rounded-full scale-110 hover:scale-125 transition-transform"
						>
							{isPlaying ? (
								<Pause className="h-5 w-5" />
							) : (
								<Play className="h-5 w-5" />
							)}
						</Button>

						<Button variant="ghost" size="icon" onClick={nextTrack}>
							<SkipForward className="h-5 w-5" />
						</Button>
					</div>

					{/* Additional controls (only visible on larger screens or when expanded) */}
					<div className={cn("items-center gap-2 ml-auto flex")}>
						{/* <Button
							variant="ghost"
							size="icon"
							onClick={toggleShuffle}
							className={cn(
								isShuffled
									? "text-primary scale-110 font-bold bg-accent/30"
									: ""
							)}
						>
							<Shuffle className="h-4 w-4" />
						</Button> */}

						<Button
							variant="ghost"
							size="icon"
							onClick={toggleRepeat}
							className={cn(
								repeatMode > 0
									? "text-primary scale-110 font-bold bg-accent/30"
									: ""
							)}
						>
							<Repeat className="h-4 w-4" />
							{repeatMode === 2 && (
								<span className="absolute text-[10px] font-bold">1</span>
							)}
						</Button>

						<div className="hidden md:flex items-center gap-1 w-24">
							<Button variant="ghost" size="icon" onClick={toggleMute}>
								{isMuted ? (
									<VolumeX className="h-4 w-4" />
								) : (
									<Volume2 className="h-4 w-4" />
								)}
							</Button>
							<Slider
								value={[isMuted ? 0 : volume]}
								min={0}
								max={1}
								step={0.01}
								onValueChange={handleVolumeChange}
								className="w-16"
							/>
						</div>

						<Button variant="ghost" size="icon" onClick={toggleExpanded}>
							{expanded ? (
								<Minimize2 className="h-4 w-4" />
							) : (
								<Maximize2 className="h-4 w-4" />
							)}
						</Button>
					</div>
				</div>

				{/* Progress bar */}
				<div
					className={`h-1 w-full bg-gray-800 ${
						expanded ? "absolute bottom-18" : "absolute top-0"
					}`}
				>
					<Slider
						value={[currentTime]}
						min={0}
						max={duration || 100}
						step={0.1}
						onValueChange={handleSeek}
						className="h-1"
					/>
				</div>
			</div>
		</>
	);
}
