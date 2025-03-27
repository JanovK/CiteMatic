import { APIGatewayProxyHandler } from 'aws-lambda'
import axios from 'axios'

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY

const defaultHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
}

export const generateCitation: APIGatewayProxyHandler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}')
    const videoUrl = body.url

    if (!videoUrl || (!videoUrl.includes('youtube.com') && !videoUrl.includes('youtu.be'))) {
      return {
        statusCode: 400,
        headers: defaultHeaders,
        body: JSON.stringify({ error: 'Invalid YouTube URL' }),
      }
    }

    const videoId = extractVideoId(videoUrl)
    if (!videoId) {
      return {
        statusCode: 400,
        headers: defaultHeaders,
        body: JSON.stringify({ error: 'Unable to extract video ID' }),
      }
    }

    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`
    )

    const video = response.data.items?.[0]
    if (!video) {
      return {
        statusCode: 404,
        headers: defaultHeaders,
        body: JSON.stringify({ error: 'Video not found' }),
      }
    }

    const { title, channelTitle, publishedAt } = video.snippet
    const year = new Date(publishedAt).getFullYear()

    const apaCitation = `${channelTitle}. (${year}). ${title} [Video]. YouTube. ${videoUrl}`

    return {
      statusCode: 200,
      headers: defaultHeaders,
      body: JSON.stringify({ citation: apaCitation }),
    }
  } catch (error) {
    console.error('Error generating citation:', error)
    return {
      statusCode: 500,
      headers: defaultHeaders,
      body: JSON.stringify({ error: 'Internal server error' }),
    }
  }
}

// Helper function to extract YouTube video ID
function extractVideoId(url: string): string | null {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/
  const match = url.match(regex)
  return match ? match[1] : null
}
