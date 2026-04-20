import Cookies from 'js-cookie';

export const getSafeCookie = (name) => {
    try {
        const cookie = Cookies.get(name);
        if (!cookie) return null;

        const decoded = decodeURIComponent(cookie);
        const cleaned = decoded.startsWith('j:') ? decoded.slice(2) : decoded;
        return JSON.parse(cleaned);
    } catch (error) {
        console.error(`Error parsing cookie ${name}:`, error);
        return null;
    }
};
