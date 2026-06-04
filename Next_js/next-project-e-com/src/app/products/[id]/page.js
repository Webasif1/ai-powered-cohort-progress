  import React from 'react'

  const page = async ({params}) => {
    let {id} = await params
    return (
      <div>
        This is product detail page -{id}
      </div>
    )
  }

  export default page
