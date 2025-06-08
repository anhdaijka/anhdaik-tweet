"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
	MediaPlayer,
	MediaPlayerAudio,
	MediaPlayerControls,
	MediaPlayerPlay,
	MediaPlayerSeek,
	MediaPlayerTime,
	MediaPlayerTooltip,
	MediaPlayerVolume,
} from "@/components/ui/media-player";
import {
	Minimize2,
	ListMusicIcon,
	Loader2Icon,
	PauseCircleIcon,
	PlayCircleIcon,
	SkipBackIcon,
	SkipForwardIcon,
} from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import playlist from "@/lib/playlist";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "motion/react";
import { useTheme } from "next-themes";

export function MusicPlayer({
	musicExpanded,
	toggleMusicExpanded,
}: {
	musicExpanded?: boolean;
	toggleMusicExpanded?: () => void;
}) {
	const [newPlaylist, setNewPlaylist] = React.useState(playlist);
	const [currentTrackIndex, setCurrentTrackIndex] = React.useState(0);
	const [isPlaying, setIsPlaying] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const audioRef = React.useRef<HTMLAudioElement | null>(null);
	const shouldPlayAfterLoad = React.useRef(false);
	const isMobile = useIsMobile();
	const { theme } = useTheme();
	const onPlay = React.useCallback(() => {
		setIsPlaying(true);
	}, []);

	const onPause = React.useCallback(() => {
		setIsPlaying(false);
	}, []);

	const onEnded = React.useCallback(() => {
		onNextTrack();
	}, []);

	const onAudioPlay = React.useCallback(async () => {
		if (!audioRef.current) return;

		try {
			await audioRef.current.play();
			setIsPlaying(true);
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "Failed to play track"
			);
			setIsPlaying(false);
		}
	}, []);

	const onLoadAndPlayTrack = React.useCallback(
		async (index: number, shouldPlay = true) => {
			const trackToPlay = newPlaylist[index];
			if (!trackToPlay) {
				toast.error("Track not found");
				return;
			}

			if (!audioRef.current) return;

			if (!audioRef.current.paused) {
				audioRef.current.pause();
			}

			setCurrentTrackIndex(index);
			setIsLoading(true);
			shouldPlayAfterLoad.current = shouldPlay;

			audioRef.current.src = trackToPlay.src;
			audioRef.current.load();
		},
		[]
	);

	const onPlayTrack = React.useCallback(
		(index: number) => {
			onLoadAndPlayTrack(index, true);
		},
		[onLoadAndPlayTrack]
	);

	const onTogglePlayPauseTrack = (index: number) => {
		if (index === currentTrackIndex) {
			if (isPlaying) {
				audioRef.current?.pause();
			} else {
				onAudioPlay();
			}
		} else {
			onPlayTrack(index);
		}
	};

	const onNextTrack = React.useCallback(() => {
		const nextIndex = (currentTrackIndex + 1) % newPlaylist.length;
		onPlayTrack(nextIndex);
	}, [currentTrackIndex, onPlayTrack]);

	const onPreviousTrack = React.useCallback(() => {
		const prevIndex =
			(currentTrackIndex - 1 + newPlaylist.length) % newPlaylist.length;
		onPlayTrack(prevIndex);
	}, [currentTrackIndex, onPlayTrack]);

	const currentTrack = React.useMemo(
		() => newPlaylist[currentTrackIndex],
		[currentTrackIndex]
	);

	React.useEffect(() => {
		//Shuffle playlist
		const shuffledPlaylist = playlist.sort(() => Math.random() - 0.5);
		setNewPlaylist(shuffledPlaylist);
	}, []);

	React.useEffect(() => {
		const audioElement = audioRef.current;
		if (!audioElement) return;

		const onCanPlay = () => {
			setIsLoading(false);
			if (shouldPlayAfterLoad.current) {
				onAudioPlay();
				shouldPlayAfterLoad.current = false;
			}
		};

		const onLoadStart = () => {
			setIsLoading(true);
		};

		const onError = () => {
			setIsLoading(false);
			setIsPlaying(false);
			toast.error("Failed to load track");
		};

		audioElement.addEventListener("canplay", onCanPlay);
		audioElement.addEventListener("loadstart", onLoadStart);
		audioElement.addEventListener("error", onError);

		return () => {
			audioElement.removeEventListener("canplay", onCanPlay);
			audioElement.removeEventListener("loadstart", onLoadStart);
			audioElement.removeEventListener("error", onError);
		};
	}, [onAudioPlay]);

	React.useEffect(() => {
		if (
			audioRef.current &&
			currentTrack &&
			audioRef.current.src !== currentTrack.src
		) {
			onLoadAndPlayTrack(currentTrackIndex, false);
		}
	}, [currentTrack, currentTrackIndex, onLoadAndPlayTrack]);

	const onKeyDown = React.useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>) => {
			const isMediaFocused = event.currentTarget.contains(
				document.activeElement
			);

			if (!isMediaFocused) return;

			switch (event.key.toLowerCase()) {
				case "n":
					event.preventDefault();
					onNextTrack();
					break;

				case "p":
					event.preventDefault();
					onPreviousTrack();
					break;
			}
		},
		[onNextTrack, onPreviousTrack]
	);

	if (!currentTrack) return null;

	return (
		<MediaPlayer
			onPlay={onPlay}
			onPause={onPause}
			onEnded={onEnded}
			onKeyDown={onKeyDown}
			data-theme={theme}
			className={cn(
				"w-full sm:max-w-sm md:max-w-md overflow-hidden rounded-lg border bg-background shadow-lg"
			)}
		>
			<MediaPlayerAudio
				ref={audioRef}
				src={currentTrack.src}
				className="sr-only"
			/>
			<div
				className={cn("flex w-full flex-col items-center gap-4 md:items-start")}
			>
				<motion.div
					initial={{ opacity: 0, y: -100 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -100 }}
					transition={{ duration: 0.5, ease: "easeInOut" }}
					className="relative w-full overflow-hidden rounded-md rounded-b-none border-b"
				>
					<div className="absolute right-4 top-4 z-[12]">
						<Button
							variant={"secondary"}
							size={"icon"}
							className="cursor-pointer rounded-[8px]"
							onClick={toggleMusicExpanded}
						>
							<Minimize2 className="size-5" />
						</Button>
					</div>

					<img
						src={currentTrack.cover}
						alt={currentTrack.title}
						className="h-24 md:h-40 w-full object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
					<div className="absolute right-0 bottom-0 left-0 p-4">
						<h2 className="font-semibold text-2xl text-foreground tracking-tight drop-shadow-lg">
							{currentTrack.title}
						</h2>
						<p className="text-sm text-foreground/90 drop-shadow-md">
							{currentTrack.artist}
						</p>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: -100 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -100 }}
					transition={{ duration: 0.5, ease: "easeInOut" }}
					className="w-full"
				>
					<div className="flex items-center border-border border-b px-4 pb-4">
						<div className="flex flex-1 items-center gap-2">
							<h3 className="font-medium text-lg text-foreground tracking-tight">
								Playlist
							</h3>
							<ListMusicIcon className="size-4 text-muted-foreground" />
						</div>
						<span className="text-muted-foreground text-sm">{`${
							currentTrackIndex + 1
						} / ${newPlaylist.length}`}</span>
					</div>
					<ScrollArea className="h-72">
						{newPlaylist.map((track, index) => (
							<Button
								key={track.id}
								variant="ghost"
								className={cn(
									"h-auto w-full rounded-none px-4 py-3 text-left",
									index === currentTrackIndex && "bg-card"
								)}
								onClick={() => onTogglePlayPauseTrack(index)}
								disabled={isLoading}
							>
								<img
									src={track.cover}
									alt={track.title}
									className={cn(
										"aspect-square size-9 rounded object-cover",
										index === currentTrackIndex && "size-12"
									)}
								/>
								<div className="flex flex-1 flex-col">
									<span
										className={cn(
											"font-medium leading-tight text-card-foreground",
											index === currentTrackIndex && "text-primary text-lg"
										)}
									>
										{track.title}
									</span>
									<span className="text-muted-foreground text-sm">
										{track.artist}
									</span>
								</div>
								{index === currentTrackIndex && isLoading ? (
									<Loader2Icon className="size-6 animate-spin text-primary" />
								) : index === currentTrackIndex && isPlaying ? (
									<PauseCircleIcon className="size-6 text-primary" />
								) : index === currentTrackIndex && !isPlaying ? (
									<PlayCircleIcon className="size-6 text-muted-foreground" />
								) : (
									<PlayCircleIcon className="size-6 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
								)}
							</Button>
						))}
					</ScrollArea>
				</motion.div>

				<MediaPlayerControls className="relative flex w-full flex-col gap-2.5">
					<MediaPlayerSeek />
					<div className="flex w-full items-center justify-center gap-2">
						<MediaPlayerTooltip tooltip="Previous track" shortcut="B">
							<Button
								aria-label="Previous track"
								variant="ghost"
								size="icon"
								className="size-8"
								onClick={onPreviousTrack}
								disabled={isLoading}
							>
								<SkipBackIcon />
							</Button>
						</MediaPlayerTooltip>
						<MediaPlayerPlay />
						<MediaPlayerTooltip tooltip="Next track" shortcut="N">
							<Button
								aria-label="Next track"
								variant="ghost"
								size="icon"
								className="size-8"
								onClick={onNextTrack}
								disabled={isLoading}
							>
								<SkipForwardIcon />
							</Button>
						</MediaPlayerTooltip>
						<MediaPlayerTime variant="progress" />
						<MediaPlayerVolume className="ml-auto" />
					</div>
				</MediaPlayerControls>
			</div>
		</MediaPlayer>
	);
}
