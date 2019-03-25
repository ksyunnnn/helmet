import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';

import styled from 'styled-components';
import marked from 'marked';
import client from './client/contentful';

const CoverImage = styled.img`
  height: 240px;
  width: 100%;
  object-fit: cover;
`;


export default ({ match }) => {
  const { id } = match.params;
  const [blog, setBlog] = useState({});
  const fetchData = async () => client.getEntry(id)
    .then((entry) => {
      setBlog(entry.fields);
    });
  useEffect(() => {
    fetchData();
  });
  return (
    <>
      <Helmet
        title={`${blog.title} | article`}
        meta={[
          { name: 'twitter:card', content: 'summary' },
          { name: 'twitter:title', content: 'Home' },
          { name: 'twitter:description', content: blog.description },
          { name: 'twitter:image', content: blog.heroImage ? blog.heroImage.fields.file.url : null },
          { property: 'og:title', content: 'Home' },
          { property: 'og:type', content: 'website' },
          { property: 'og:url', content: `/${id}` },
          { property: 'og:image', content: blog.heroImage ? blog.heroImage.fields.file.url : null },
          { property: 'og:description', content: blog.description },
        ]}
      />
      <CoverImage src={blog.heroImage ? blog.heroImage.fields.file.url : null} />
      <div style={{ padding: '0 16px' }} dangerouslySetInnerHTML={blog.body ? { __html: marked(blog.body) } : null} />
    </>
  );
};
