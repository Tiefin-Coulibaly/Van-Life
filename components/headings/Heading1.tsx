const Heading1 = ({ title, className="" }) => {
    return (
      <h1 className={`mb-6 text-4xl font-extrabold text-black dark:text-white  xl:text-sectiontitle1 ${className}`}>
        {title}
      </h1>
    );
  };
  
  export default Heading1;
  