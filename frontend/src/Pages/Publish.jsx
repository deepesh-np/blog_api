/** @format */

import React, { useState } from 'react';
import Preview from '../Components/MarkdownPreview.jsx';
import api from '../api/axios.js';

const TITLE_LIMIT = 10;
const SUBTITLE_LIMIT = 20;

const countWords = (text) =>
  text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

const Publish = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [body, setBody] = useState('');
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLimitedInput = (value, limit, setter) => {
    if (countWords(value) <= limit) setter(value);
  };

  const markdownContent = `
## ${title}

### ${subtitle}

${body}
`;

  const saveDraft = async () => {
    if (!title.trim()) {
      setMessage('Title is required');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/articles/new-blog', {
        title,
        bodyMarkdown: `## ${title}\n\n### ${subtitle}\n\n${body}`,
      });

      setMessage('Draft saved successfully!');
      setTitle('');
      setSubtitle('');
      setBody('');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to save draft');
    } finally {
      setLoading(false);
    }
  };

  const publishArticle = async () => {
    if (!title.trim()) {
      setMessage('Title is required');
      return;
    }

    setLoading(true);
    try {
      const draftResponse = await api.post('/articles/new-blog', {
        title,
        bodyMarkdown: `## ${title}\n\n### ${subtitle}\n\n${body}`,
      });

      const slug = draftResponse.data.slug;

      await api.patch(`/articles/slug/${slug}/publish`);

      setMessage('Article published successfully!');
      setTitle('');
      setSubtitle('');
      setBody('');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to publish article');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 text-gray-900 px-6 py-10'>
      <div className='max-w-4xl mx-auto space-y-8'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Publish Article</h1>
          <p className='text-gray-500 text-sm'>
            Clean writing. Zero fluff. Ship.
          </p>
        </div>

        {message && (
          <div
            className={`p-4 rounded-xl text-sm font-semibold ${
              message.includes('successfully')
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
            {message}
          </div>
        )}

        {!preview ? (
          <>
            <div>
              <input
                type='text'
                placeholder='Article title'
                value={title}
                onChange={(e) =>
                  handleLimitedInput(e.target.value, TITLE_LIMIT, setTitle)
                }
                className='w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
              />
              <p className='text-xs text-gray-500 mt-1'>
                {countWords(title)} / {TITLE_LIMIT} words
              </p>
            </div>

            <div>
              <input
                type='text'
                placeholder='Subtitle (optional)'
                value={subtitle}
                onChange={(e) =>
                  handleLimitedInput(
                    e.target.value,
                    SUBTITLE_LIMIT,
                    setSubtitle
                  )
                }
                className='w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500'
              />
              <p className='text-xs text-gray-500 mt-1'>
                {countWords(subtitle)} / {SUBTITLE_LIMIT} words
              </p>
            </div>

            <div>
              <textarea
                rows={14}
                placeholder='Write your content in Markdown...'
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className='w-full bg-white border border-gray-300 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500'
              />
            </div>
          </>
        ) : (
          <div className='bg-white rounded-xl px-10 py-12 border border-gray-200'>
            <Preview content={markdownContent} />
          </div>
        )}

        <div className='flex gap-4 pt-4'>
          <button
            onClick={() => setPreview(!preview)}
            className='px-5 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 transition'
            disabled={loading}>
            {preview ? 'Edit' : 'Preview'}
          </button>

          <button
            onClick={saveDraft}
            className='px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50'
            disabled={loading}>
            {loading ? 'Saving...' : 'Save Draft'}
          </button>

          <button
            onClick={publishArticle}
            className='px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition font-semibold disabled:opacity-50'
            disabled={loading}>
            {loading ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Publish;
