import React from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../../utils/createUrqlClient';

const EditPost = ({}) => {
  return (
    <div>
      <h1>Edit Post</h1>
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(EditPost);
