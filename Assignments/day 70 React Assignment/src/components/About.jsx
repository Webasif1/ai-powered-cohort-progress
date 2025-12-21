const About = () => {
  return (
    <div className="px-6 py-10 flex flex-col xl:flex-row gap-5 items-center">
      <div className="xl:w-1/2 p-2 rounded-xl lg:p-15 p-5 bg-zinc-900">
        <h4 className="text-zinc-300 font-medium text-xl">About</h4>
        <h3 className="text-zinc-200 text-3xl lg:text-6xl mt-3 lg:mt-20">WHERE FASHION MEETS<br/> FREEDOM</h3>
        <div className="flex text-zinc-400 flex-col lg:flex-row gap:2 pt-2 lg:gap-5 mt-3">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae ipsam animi vel quae deserunt officia? Eius perspiciatis natus, optio cupiditate illum unde ullam architecto! Accusantium esse laboriosam cumque sapiente mollitia!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae ipsam animi vel quae deserunt officia? Eius perspiciatis natus, optio cupiditate illum unde ullam architecto! Accusantium esse laboriosam cumque sapiente mollitia!</p>
        </div>
      </div>
        <div className="h-100 w-full lg:h-140 xl:h-120 xl:w-1/2 bg-[url(https://images.unsplash.com/photo-1697914584131-27c608c4bfe8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat rounded-xl"></div>
    </div>
  )
}

export default About
