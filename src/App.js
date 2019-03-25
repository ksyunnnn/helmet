import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import styled from 'styled-components';
import Helmet from 'react-helmet';
import client from './client/contentful';


import Article from './Article';

const Main = styled.main`
  padding: 80px 16px;
  padding-top: 0;
  > h1 {
    font-size: 8vw;
  }
`;

export default () => {
  const [blogs, setBlogs] = useState([]);
  const fetchData = async () => client.getEntries({
    content_type: 'blogPost',
  })
    .then((entries) => {
      setBlogs(entries.items);
    });
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Helmet title="Default title" />
      <Router>
        <Main>
          <h1>My Thing, Engineering,  Philosophy, or Business</h1>
          {blogs.map(blog => (
            <li key={blog.sys.id}><Link to={`/${blog.sys.id}`}>{blog.fields.title}</Link></li>
          ))}
        </Main>
        <div style={{ maxWidth: '640px', margin: 'auto' }}>
          <Route path="/:id" component={Article} />
        </div>
      </Router>
    </>
  );
};
