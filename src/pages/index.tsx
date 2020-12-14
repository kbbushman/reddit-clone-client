import React, { useState } from "react";
import NextLink from 'next/link';
import { Box, Button, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePostsQuery } from '../generated/graphql';
import Layout from '../components/Layout';
import UpdootSection from "../components/UpdootSection";
import EditDeletePostButtons from "../components/EditDeletePostButtons";

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
      {fetching && !data 
        ? <div>Loading...</div>
        : (
          <Stack spacing={8}>
            {data!.posts.posts.map((post) => !post
              ? null
              : (
                <Flex key={post.id} p={5} shadow="md" borderWidth="1px">
                  <UpdootSection post={post} />
                  <Box flex={1}>
                    <NextLink href='/post/[id]' as={`/post/${post.id}`}>
                      <Link>
                        <Heading mb={1} fontSize="xl">{post.title}</Heading>
                      </Link>
                    </NextLink>
                    <Text mb={4}>posted by {post.creator.username}</Text>
                    <Flex align='center'>
                      <Text flex={1}>{post.textSnippet}</Text>
                      <Box ml='auto'>
                        <EditDeletePostButtons id={post.id} creatorId={post.creator.id} />
                      </Box>
                    </Flex>
                  </Box>
                </Flex>
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
