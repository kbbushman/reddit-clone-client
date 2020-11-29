import React, { useState } from 'react';
import { Flex, IconButton, Text } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql';

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [, vote] = useVoteMutation();
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");

  return (
    <Flex
      direction='column'
      justifyContent='center'
      alignItems='center'
      mr={4}
    >
      <IconButton
        aria-label="Upvote"
        background={post.voteStatus === 1 ? 'green.100' : 'gray.100'}
        icon={<ChevronUpIcon size='24px' />}
        isLoading={loadingState === "updoot-loading"}
        onClick={async () => {
          if (post.voteStatus === 1) {
            return;
          }
          setLoadingState("updoot-loading");
          await vote({
            postId: post.id,
            value: 1,
          });
          setLoadingState("not-loading");
        }}
      />
      <Text my={2}>
        {post.points}
      </Text>
      <IconButton
        aria-label="Downvote"
        background={post.voteStatus === -1 ? 'red.100' : 'gray.100'}
        icon={<ChevronDownIcon size='24px' />}
        isLoading={loadingState === "downdoot-loading"}
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          setLoadingState("downdoot-loading");
          await vote({
            postId: post.id,
            value: -1,
          });
          setLoadingState("not-loading");
        }}
      />
    </Flex>
  );
};

export default UpdootSection;
