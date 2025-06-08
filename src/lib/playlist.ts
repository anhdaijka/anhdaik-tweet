const playlist = [
	{
		id: "1",
		title: "Breakeven",
		artist: "The Script",
		cover:
			"https://ia803400.us.archive.org/32/items/the-script-the-script-cd-japan-2008-flac/Cover.jpg?cnt=0",
		src: "https://dnma3z6c8ojev.cloudfront.net/songs/mp3_files/10258765/original/The_script-breakeven.mp3",
	},
	{
		id: "2",
		title: "The Man Who Can't Be Moved",
		artist: "The Script",
		cover:
			"https://ia803400.us.archive.org/32/items/the-script-the-script-cd-japan-2008-flac/Cover.jpg?cnt=0",
		src: "https://dnma3z6c8ojev.cloudfront.net/songs/mp3_files/10258332/original/The_Man_Who_Can_t_Be_Moved.mp3",
	},
	{
		id: "4",
		title: "No Good In Goodbye",
		artist: "The Script",
		cover:
			"https://upload.wikimedia.org/wikipedia/en/2/2b/The_Script_Science_%26_Faith.jpg",
		src: "https://dn720302.ca.archive.org/0/items/the-script-no-sound-without-silence/01%20No%20Good%20in%20Goodbye.mp3",
	},
	{
		id: "5",
		title: "Man On The Wire",
		artist: "The Script",
		cover:
			"https://upload.wikimedia.org/wikipedia/en/2/2b/The_Script_Science_%26_Faith.jpg",
		src: "https://dn720302.ca.archive.org/0/items/the-script-no-sound-without-silence/03%20Man%20on%20a%20Wire.mp3",
	},
	{
		id: "6",
		title: "Before The Worst",
		artist: "The Script",
		album: "The Script",
		cover:
			"https://ia803400.us.archive.org/32/items/the-script-the-script-cd-japan-2008-flac/Cover.jpg?cnt=0",
		src: "https://ia803400.us.archive.org/32/items/the-script-the-script-cd-japan-2008-flac/02%20-%20Before%20The%20Worst.mp3",
	},
	{
		id: "7",
		title: "Car's Outside",
		artist: "James Arthur",
		cover: "https://i.kfs.io/album/global/188444462,2v1/fit/500x500.jpg",
		src: "https://bxlkizmujnwwkeqbqfsi.supabase.co/storage/v1/object/sign/media/audio/Car'S%20Outside%20-%20James%20Arthur.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYWM4NGE4NC0zYzRmLTQ2M2QtYjYzZi1kNGJjZmYzMWNmNjQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS9hdWRpby9DYXInUyBPdXRzaWRlIC0gSmFtZXMgQXJ0aHVyLm1wMyIsImlhdCI6MTc0OTQwODE3OSwiZXhwIjoxNzgwOTQ0MTc5fQ.dTE-MOQGBXcOFOuMxcEA05Npp1MdlOBDEftyazc7J68",
	},
	{
		id: "8",
		title: "Different Lives",
		artist: "Fly by Midnight",
		cover: "https://i.scdn.co/image/ab67616d00001e02184d56ddcba9c4b049a3feba",
		src: "https://bxlkizmujnwwkeqbqfsi.supabase.co/storage/v1/object/sign/media/audio/Different%20Lives%20-%20Fly%20By%20Midnight.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYWM4NGE4NC0zYzRmLTQ2M2QtYjYzZi1kNGJjZmYzMWNmNjQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS9hdWRpby9EaWZmZXJlbnQgTGl2ZXMgLSBGbHkgQnkgTWlkbmlnaHQubXAzIiwiaWF0IjoxNzQ5NDA4Mjc1LCJleHAiOjE3NDk0OTQ2NzV9.TMA59Pji4yuMS7loIZ6YGkr01q3SN2RYhZQuoMmSv7c",
	},
	{
		id: "9",
		title: "Impossible",
		artist: "James Arthur",
		cover:
			"https://images.genius.com/dd0b1fc5a8f0707a775da69cfdc7ba42.960x960x1.jpg",
		src: "https://bxlkizmujnwwkeqbqfsi.supabase.co/storage/v1/object/sign/media/audio/Impossible%20-%20James%20Arthur.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYWM4NGE4NC0zYzRmLTQ2M2QtYjYzZi1kNGJjZmYzMWNmNjQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS9hdWRpby9JbXBvc3NpYmxlIC0gSmFtZXMgQXJ0aHVyLm1wMyIsImlhdCI6MTc0OTQwODMwNiwiZXhwIjoxNzgwOTQ0MzA2fQ._ak75r63IsV7OV9FOPS2BwiII--iLEoO6eVzrMZh160",
	},
	{
		id: "10",
		title: "Iris",
		artist: "Goo Goo Dolls",
		cover: "https://i.scdn.co/image/ab67616d0000b273eda9478c39a21e1cdc6609ca",
		src: "https://bxlkizmujnwwkeqbqfsi.supabase.co/storage/v1/object/sign/media/audio/Iris%20-%20Goo%20Goo%20Dolls.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYWM4NGE4NC0zYzRmLTQ2M2QtYjYzZi1kNGJjZmYzMWNmNjQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS9hdWRpby9JcmlzIC0gR29vIEdvbyBEb2xscy5tcDMiLCJpYXQiOjE3NDk0MDgzNjMsImV4cCI6MTc4MDk0NDM2M30.o3u66XNJFtaMdSz6u9unkEHP3pdvsFvVp9HWL_U0bpA",
	},
	{
		id: "11",
		title: "Naked",
		artist: "James Arthur",
		cover: "https://i1.sndcdn.com/artworks-000282218276-8bl5rs-t500x500.jpg",
		src: "https://bxlkizmujnwwkeqbqfsi.supabase.co/storage/v1/object/sign/media/audio/Naked%20-%20James%20Arthur%20-%20Naked.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYWM4NGE4NC0zYzRmLTQ2M2QtYjYzZi1kNGJjZmYzMWNmNjQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS9hdWRpby9OYWtlZCAtIEphbWVzIEFydGh1ciAtIE5ha2VkLm1wMyIsImlhdCI6MTc0OTQwODM5MCwiZXhwIjoxNzgwOTQ0MzkwfQ.FBRp_QtXkBYwdasCSD94ybBTFhyEmibvEq1LP3g72ls",
	},
	{
		id: "12",
		title: "No Choice",
		artist: "Fly by Midnight",
		cover: "https://i.scdn.co/image/ab67616d0000b27363f215c50f7ee4746584507a",
		src: "https://bxlkizmujnwwkeqbqfsi.supabase.co/storage/v1/object/sign/media/audio/No%20Choice%20-%20Fly%20By%20Midnight.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYWM4NGE4NC0zYzRmLTQ2M2QtYjYzZi1kNGJjZmYzMWNmNjQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS9hdWRpby9ObyBDaG9pY2UgLSBGbHkgQnkgTWlkbmlnaHQubXAzIiwiaWF0IjoxNzQ5NDA4NDE3LCJleHAiOjE3ODA5NDQ0MTd9.n3FniFQGSntTXmKJ4Qmx5fGFfarWdiEVZWC5RU6G52s",
	},
	{
		id: "13",
		title: "Rewrite The Stars",
		artist: "James Arthur & Anne-Marie",
		cover:
			"https://images.genius.com/89309a706a2098ceafa00c9950ee2081.1000x1000x1.jpg",
		src: "https://bxlkizmujnwwkeqbqfsi.supabase.co/storage/v1/object/sign/media/audio/Rewrite%20The%20Stars%20-%20James%20Arthur,%20Anne-Marie.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYWM4NGE4NC0zYzRmLTQ2M2QtYjYzZi1kNGJjZmYzMWNmNjQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS9hdWRpby9SZXdyaXRlIFRoZSBTdGFycyAtIEphbWVzIEFydGh1ciwgQW5uZS1NYXJpZS5tcDMiLCJpYXQiOjE3NDk0MDg0NDUsImV4cCI6MTc4MDk0NDQ0NX0.ImSU_cW_VI5zqwnJgXuglXnWDb0ou5AxKEozUGbvKbo",
	},
];

export default playlist;
