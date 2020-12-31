import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable jsx-a11y/html-has-lang  */
/* eslint-disable react/forbid-prop-types  */

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
        <script
          src="https://badger.maier.dev/script.js"
          data-spa="auto"
          data-included-domains="coding.maier.dev"
          data-site="CATAPAVW"
          defer
        />
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key="body"
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};

/* eslint-enable jsx-a11y/html-has-lang */
/* eslint-enable react/forbid-prop-types  */
