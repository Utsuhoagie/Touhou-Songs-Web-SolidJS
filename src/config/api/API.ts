import ky from 'ky';

export const api = ky.create({ prefixUrl: `https://localhost:5000/api` });
