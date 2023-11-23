/** Expects url to be a Youtube video full URL with 'watch?v=' */
export function getYoutubeThumbnailUrl(url: string): string {
	const videoId = url.split('watch?v=')[1];
	return `https://img.youtube.com/vi/${videoId}/0.jpg`;
}
