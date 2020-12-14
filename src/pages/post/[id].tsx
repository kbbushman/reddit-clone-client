import React from 'react';
import { withUrqlClient } from 'next-urql';
import { Box, Heading } from '@chakra-ui/react';
import { createUrqlClient } from '../../utils/createUrqlClient';
import Layout from '../../components/Layout';
import { useGetPostFromUrl } from '../../utils/useGetPostFromUrl';
import EditDeletePostButtons from '../../components/EditDeletePostButtons';

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
      <Heading mb={3}>{data?.post?.title}</Heading>
      <Box mb={4}>
        {data?.post?.text}
      </Box>
      <EditDeletePostButtons id={data.post.id} creatorId={data.post.creator.id} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, {ssr: true})(Post);
