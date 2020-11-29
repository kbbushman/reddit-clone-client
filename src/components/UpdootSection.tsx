import React from 'react';
import { Flex, IconButton } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { PostSnippetFragment } from '../generated/graphql';

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
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
        onClick={() => console.log('Upvote ' + post.id)}
      />
      {post.points}
      <IconButton
        aria-label="Downvote"
        icon={<ChevronDownIcon size='24px' />}
        onClick={() => console.log('Downvote ' + post.id)}
      />
    </Flex>
  );
};

export default UpdootSection;
