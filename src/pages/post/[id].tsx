import React from 'react';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { createUrqlClient } from '../../utils/createUrqlClient';

interface PostProps {

}

const Post: React.FC<PostProps> = ({}) => {
  const router = useRouter();
  router.query.id;
  return (
    <div>
      Post Detail
    </div>
  );
};

export default withUrqlClient(createUrqlClient, {ssr: true})(Post);
