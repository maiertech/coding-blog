import React from 'react';
import { arrayOf, object, shape, string } from 'prop-types';
import DirectoryList from 'gatsby-theme-notes/src/components/directory-list';
import FileList from 'gatsby-theme-notes/src/components/file-list';
import Breadcrumbs from 'gatsby-theme-notes/src/components/breadcrumbs';
import { Container } from 'theme-ui';

import Layout from './layout';

const NotesPage = ({ directories, files, breadcrumbs = [] }) => {
  let crumbs;
  if (breadcrumbs.length) {
    crumbs = <Breadcrumbs links={breadcrumbs} />;
  }
  return (
    <Layout>
      <Container>
        {crumbs}
        <DirectoryList directories={directories} />
        <FileList files={files} />
      </Container>
    </Layout>
  );
};

NotesPage.propTypes = {
  directories: object.isRequired,
  files: arrayOf(string.isRequired).isRequired,
  breadcrumbs: arrayOf(
    shape({ name: string.isRequired, url: string.isRequired })
  ).isRequired,
};

export default NotesPage;
