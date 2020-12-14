import React from 'react';
import { withUrqlClient } from 'next-urql';
import { Box, Heading } from '@chakra-ui/react';
import { createUrqlClient } from '../../utils/createUrqlClient';
import Layout from '../../components/Layout';
import { useGetPostFromUrl } from '../../utils/useGetPostFromUrl';

const Post = ({}) => {
  const [{data, error, fetching}] = useGetPostFromUrl();

  if (fetching) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>{error.message}</Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>
          Could not find post
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading>{data?.post?.title}</Heading>
      {data?.post?.text}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, {ssr: true})(Post);
