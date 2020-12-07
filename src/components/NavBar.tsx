import React from 'react';
import NextLink from 'next/link';
import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;

  if (fetching) {
    body = '';
  } else if (!data?.me) {
    body = !isServer() && (
      <>
        <NextLink href='/login'>
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href='/register'>
          <Link>Register</Link>
        </NextLink>
      </>
    )
  } else {
    body = (
      <Flex align='center'>
        <NextLink href='/create-post'>
          <Button background='gray.200' as={Link} mr={4}>
            Create Post
          </Button>
        </NextLink>
        <Box mr={3}>{data.me.username}</Box>
        <Button
          variant='link'
          isLoading={logoutFetching}
          onClick={() => logout()}
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex position='sticky' top={0} zIndex={1} bg='tan' p={4} align='center'>
      <Flex align='center' m='auto' flex={1} maxW={800}>
        <NextLink href='/'>
          <Link>
            <Heading>Reddit Clone</Heading>
          </Link>
        </NextLink>
        <Box ml={'auto'}>
          {body}
        </Box>
      </Flex>
    </Flex>
  );
};

export default NavBar;
