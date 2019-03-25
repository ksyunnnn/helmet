import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import marked from 'marked';
import client from './client/contentful';


export default (props) => {
  const [blog, setBlog] = useState({});
  const fetchData = async () => client.getEntry(props.match.params.id)
    .then((entry) => {
      setBlog(entry.fields);
    });
  useEffect(() => {
    fetchData();
  });

  return (
    <>
      <div style={{ padding: '0 16px' }} dangerouslySetInnerHTML={blog.body ? { __html: marked(blog.body) } : null} />
    </>
  );
};
