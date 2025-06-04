import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, gql, useQuery } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://graphqlzero.almansi.me/api' }),
  cache: new InMemoryCache(),
});

interface Post {
  id: string;
  title: string;
  body: string;
}

const POSTS_QUERY = gql`
  query GetPosts {
    posts(options: { paginate: { page: 1, limit: 5 } }) {
      data {
        id
        title
        body
      }
    }
  }
`;

const Posts = () => {
  const { data, loading, error } = useQuery<{ posts: { data: Post[] } }>(POSTS_QUERY);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

  return (
    <ul>
      {data.posts.data.map((post) => (
        <li key={post.id}>
          <strong>{post.title}</strong> - {post.body}
        </li>
      ))}
    </ul>
  );
};

const ApolloPosts = () => (
  <ApolloProvider client={client}>
    <Posts />
  </ApolloProvider>
);

export default ApolloPosts;
