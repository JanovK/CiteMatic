import { APIGatewayProxyHandler } from 'aws-lambda';
import axios from 'axios';
import { extractVideoId } from './utils/youtube';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

const defaultHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
};

export const generateCitation: APIGatewayProxyHandler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');
    const videoUrl = body.url;

    if (!videoUrl || (!videoUrl.includes('youtube.com') && !videoUrl.includes('youtu.be'))) {
      return {
        statusCode: 400,
        headers: defaultHeaders,
        body: JSON.stringify({ error: 'Invalid YouTube URL' }),
      };
    }

    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      return {
        statusCode: 400,
        headers: defaultHeaders,
        body: JSON.stringify({ error: 'Unable to extract video ID' }),
      };
    }

    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`
    );

    const video = response.data.items?.[0];
    if (!video) {
      return {
        statusCode: 404,
        headers: defaultHeaders,
        body: JSON.stringify({ error: 'Video not found' }),
      };
    }

    const { title, channelTitle, publishedAt } = video.snippet;

    const dateObj = new Date(publishedAt);
    const citationParts = {
      author: channelTitle,
      date: `${dateObj.getFullYear()}, ${dateObj.toLocaleString('en-US', {
        month: 'long',
      })} ${dateObj.getDate()}`,
      title,
      url: videoUrl,
    };

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