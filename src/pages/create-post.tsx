import React from 'react';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { Box, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import Layout from '../components/Layout';
import InputField from '../components/InputField';
import { useCreatePostMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useIsAuth } from '../utils/useIsAuth';

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [, createPost] = useCreatePostMutation();

  return (
    <Layout variant='small'>
      <Formik
        initialValues={{title: '', text: ''}}
        onSubmit={async (values) => {
          const { error } = await createPost({input: values});
          if (!error) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='title'
              placeholder='Title'
              label='Title'
              type='text'
            />
            <Box mt={4}>
              <InputField
                name='text'
                placeholder='Text...'
                label='Body'
                textarea
              />
            </Box>
            <Button
              mt={4}
              type='submit'
              colorScheme='teal'
              isLoading={isSubmitting}
            >
              Create Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
