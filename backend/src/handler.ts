import { APIGatewayProxyHandler } from 'aws-lambda';
import axios from 'axios';
import { extractVideoId } from './utils/youtube';

const DEBUG = process.env.DEBUG === 'true';
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

const defaultHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
};

export const generateCitation: APIGatewayProxyHandler = async (event) => {
  try {
    if (DEBUG) {
      console.log('Incoming Lambda Event:', {
        path: event.path,
        headers: event.headers,
        body: event.body,
      });
    }

    const body = JSON.parse(event.body || '{}');
    const videoUrl = body.url;

    if (!videoUrl || (!videoUrl.includes('youtube.com') && !videoUrl.includes('youtu.be'))) {
      if (DEBUG) console.log('Invalid YouTube URL:', videoUrl);
      return {
        statusCode: 400,
        headers: defaultHeaders,
        body: JSON.stringify({ error: 'Invalid YouTube URL' }),
      };
    }

    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      if (DEBUG) console.log('Unable to extract video ID from:', videoUrl);
      return {
        statusCode: 400,
        headers: defaultHeaders,
        body: JSON.stringify({ error: 'Unable to extract video ID' }),
      };
    }

    if (DEBUG) console.log('Extracted video ID:', videoId);

    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`
    );

    if (DEBUG) {
      console.log('YouTube API response meta:', {
        status: response.status,
        statusText: response.statusText,
        itemsCount: response.data.items?.length ?? 0,
      });
    }

    const video = response.data.items?.[0];
    if (!video) {
      if (DEBUG) console.log('Video not found in YouTube API data for ID:', videoId);
      return {
        statusCode: 404,
        headers: defaultHeaders,
        body: JSON.stringify({ error: 'Video not found' }),
      };
    }

    const { title, channelTitle, publishedAt } = video.snippet;

    if (DEBUG) {
      console.log('Snippet data:', { title, channelTitle, publishedAt });
    }

    const dateObj = new Date(publishedAt);
    const citationParts = {
      author: channelTitle,
      date: `${dateObj.getFullYear()}, ${dateObj.toLocaleString('en-US', {
        month: 'long',
      })} ${dateObj.getDate()}`,
      title,
      url: videoUrl,
    };

    if (DEBUG) {
      console.log('Citation parts generated:', citationParts);
    }

    return {
      statusCode: 200,
      headers: defaultHeaders,
      body: JSON.stringify(citationParts),
    };
  } catch (error) {
    console.error('Error generating citation:', error);
    return {
      statusCode: 500,
      headers: defaultHeaders,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
