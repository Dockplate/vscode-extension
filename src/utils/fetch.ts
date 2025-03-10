import * as https from 'https';

let cachedDockerImages: string[] | null = null;

/**
 * Fetches and parses JSON data from a given URL.
 */

type ResponseType = 'json' | 'text';

export async function fetchData<T = unknown>(url: string, type: ResponseType = 'json'): Promise<T | string> {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';

            if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return fetchData<T>(res.headers.location, type).then(resolve).catch(reject);
            }

            if (res.statusCode !== 200) {
                res.resume(); // Consume response to prevent memory leaks
                return reject(new Error(`Failed to fetch ${url}: ${res.statusCode}`));
            }

            res.on('data', (chunk) => (data += chunk));
            res.on('end', () => {
                try {
                    resolve(type === 'json' ? JSON.parse(data) : data);
                } catch {
                    reject(new Error(`Invalid JSON from ${url}`));
                }
            });
        }).on('error', reject);
    });
}
/**
 * Fetches the list of available Docker images.
 * Uses caching to avoid unnecessary network requests.
 */
export async function getDockerImages(): Promise<string[]> {
    if (!cachedDockerImages) {
        const url = 'https://raw.githubusercontent.com/Dockplate/dockerfiles/refs/heads/master/data/data.json';
        cachedDockerImages = await fetchData<string[]>(url, "json") as any[];
    }
    return cachedDockerImages.map(item => item.charAt(0).toUpperCase() + item.slice(1));
}
