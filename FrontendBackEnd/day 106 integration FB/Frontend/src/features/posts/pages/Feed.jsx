import React, { useEffect } from 'react'
import Post from '../components/Post'
import { usePost } from '../hooks/usePost'
import Nav from '../../shared/Components/Nav'
import "../style/feed.scss"

const Feed = () => {

  const { loading, feed, handleGetFeed } = usePost()

  useEffect(() => {
    handleGetFeed()
  }, [])

  if(loading || !feed){
    return(<main>
      <h1>Feed is loading...</h1>
    </main>
    )
  }

  console.log(feed)

  return (
    <main className='feed-page'>
      <Nav/>
      <div className="feed">
        <div className="posts">
            {feed.map((post)=>{
              return <Post user={post.user} post={post}/>
            })}
        </div>
      </div>
    </main>
  )
}

export default Feed
