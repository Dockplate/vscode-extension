import * as https from 'https';

let cachedDockerImages: string[] | null = null;

/**
 * Fetches and parses JSON data from a given URL.
 */
export async function fetchJson<T>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';

            if (res.statusCode !== 200) {
                reject(new Error(`Failed to fetch ${url}: ${res.statusCode}`));
                return;
            }

            res.on('data', (chunk) => (data += chunk));
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (error) {
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
        cachedDockerImages = await fetchJson<string[]>(url);
    }
    return cachedDockerImages.map(item => item.charAt(0).toUpperCase() + item.slice(1));
}
