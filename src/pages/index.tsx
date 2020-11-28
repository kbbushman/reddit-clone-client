import React from "react";
import NextLink from 'next/link';
import { Box, Button, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePostsQuery } from '../generated/graphql';
import Layout from '../components/Layout';

const Index = () => {
  const [{ data, fetching }] = usePostsQuery({
    variables: {
      limit: 10,
    }
  });

  if (!fetching && !data) {
    return <div>No posts available</div>
  }

  return (
    <Layout>
      <Flex align='center'>
        <Heading>RedditClone</Heading>
        <NextLink href='/create-post'>
          <Link ml='auto'>
            Create Post
          </Link>
        </NextLink>
      </Flex>
      <br />
      {fetching && !data 
        ? <div>Loading...</div>
        : (
          <Stack spacing={8}>
            {data!.posts.map((post) => (
              <Box key={post.id} p={5} shadow="md" borderWidth="1px">
                <Heading fontSize="xl">{post.title}</Heading>
                <Text mt={4}>{post.textSnippet}</Text>
              </Box>
            ))}
          </Stack>
        )
      }

      {data && (
        <Flex>
          <Button
            m='auto'
            my={8}
            colorScheme='blue'
            isLoading={fetching}
          >
            Load More
          </Button>
        </Flex>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, {ssr: true})(Index);
