import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {PostAuthor} from './PostAuthor'
import { selectAllPosts, fetchPosts  } from './postsSlice'

export const PostsList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)

  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  const postStatus = useSelector(state => state.posts.status)
  const error = useSelector(state => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  

  const renderedPosts = orderedPosts.map(post => (
    
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
       <div>
        <PostAuthor userId={post.user} />
      </div>
      <p>{post.content.substring(0, 100)}</p>
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  ))

  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
      
    </section>
  )
}