import { MD5 } from 'crypto-js';

export const generateGravatarURL = (email) => `https://www.gravatar.com/avatar/${MD5(email).toString()}`;
