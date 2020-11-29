import React from 'react';
import { Flex, IconButton } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql';

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [, vote] = useVoteMutation();
  return (
    <Flex
      direction='column'
      justifyContent='center'
      alignItems='center'
      mr={4}
    >
      <IconButton
        aria-label="Upvote"
        icon={<ChevronUpIcon size='24px' />}
        onClick={() => {
          vote({postId: post.id, value: 1})
        }}
      />
      {post.points}
      <IconButton
        aria-label="Downvote"
        icon={<ChevronDownIcon size='24px' />}
        onClick={() => {
          vote({postId: post.id, value: -1})
        }}
      />
    </Flex>
  );
};

export default UpdootSection;
