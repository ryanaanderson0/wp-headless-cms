
import styles from '@/styles/Home.module.css'


export default function Home( {posts} ) {
  return (
    <>
    
    {posts.nodes.map(post => {
      return(
        <div key={post.id}>
          <h2>{post.title}</h2>
          <h5>{post.author.firstName}</h5>
          <a href={post.slug}>Test</a>
          <p></p>
        </div>
      )
    })}
    
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch('http://headless-wp.local/graphql', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      query: `
        query AllPosts {
          posts {
            nodes {
              id
              slug
              title
              content
              author {
                node {
                  firstName
                  lastName
                }
              }
            }
          }
        }
      `,
    })
  })

  const json = await res.json()

  return {
    props: {
      posts: json.data.posts,
    },
  }
}
