import React from 'react';
import Head from 'next/head';

const HeadPage = ({ title }) => {
  return (
    <Head>
      <title>Palpite Box | {title}</title>
    </Head>
  );
};

export default HeadPage;
