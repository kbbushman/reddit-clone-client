import React, { useState } from "react";
import NextLink from 'next/link';
import { Box, Button, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePostsQuery } from '../generated/graphql';
import Layout from '../components/Layout';

const Index = () => {
  const [variables, setVariables] = useState({limit: 15, cursor: null as string | null});
  const [{ data, fetching }] = usePostsQuery({
    variables,
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
            {data!.posts.posts.map((post) => (
              <Box key={post.id} p={5} shadow="md" borderWidth="1px">
                <Heading mb={1} fontSize="xl">{post.title}</Heading>
                <Text mb={4}>posted by {post.creator.username}</Text>
                <Text>{post.textSnippet}</Text>
              </Box>
            ))}
          </Stack>
        )
      }

      {data && data.posts.hasMore && (
        <Flex>
          <Button
            m='auto'
            my={8}
            colorScheme='blue'
            isLoading={fetching}
            onClick={() => setVariables({
              limit: variables.limit,
              cursor: data.posts.posts[data.posts.posts.length - 1].createdAt})
            }
          >
            Load More
          </Button>
        </Flex>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, {ssr: true})(Index);
