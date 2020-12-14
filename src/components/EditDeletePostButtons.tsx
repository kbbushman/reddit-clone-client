import React from 'react';
import NextLink from 'next/link';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, IconButton, Link } from '@chakra-ui/react';
import { useDeletePostMutation } from '../generated/graphql';

interface EditDeletePostButtonsProps {
  id: number
}

const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({ id }) => {
  const [, deletePost] = useDeletePostMutation();
  
  return (
    <Box>
      <IconButton
        aria-label="Delete"
        // background='red.400'
        // color='white'
        // colorScheme='grey'
        mr={3}
        icon={<DeleteIcon size='24px' />}
        onClick={() => {
          deletePost({id: id});
        }}
      />
      <NextLink href={'/post/edit/[id]'} as={`/post/edit/${id}`}>
        <IconButton
          as={Link}
          aria-label="Edit"
          // background='green.400'
          // color='white'
          // colorScheme='green'
          icon={<EditIcon size='24px' />}
        />
      </NextLink>
    </Box>
  );
};

export default EditDeletePostButtons;
