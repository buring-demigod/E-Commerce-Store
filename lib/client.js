import { createClient } from '@sanity/client';
import createImageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: 'kaj4jp18',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2023-03-18',
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = createImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);