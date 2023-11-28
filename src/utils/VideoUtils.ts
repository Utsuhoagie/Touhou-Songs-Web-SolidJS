/** Expects url to be a Youtube video full URL with 'watch?v=' */
export function getYoutubeThumbnailUrl(url: string): string {
	const isYoutubeUrl = url.includes('youtu');

	if (!isYoutubeUrl) {
		return '';
	}

	const isLongUrl = url.includes('/watch?v=');
	const videoId = isLongUrl
		? url.split('watch?v=')[1].split('&')[0]
		: url.split('youtu.be/')[1].split('&')[0];
	return `https://img.youtube.com/vi/${videoId}/0.jpg`;
}
