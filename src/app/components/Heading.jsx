const Heading = ({ content, className, tag: Tag = "h2" }) => {
  return (
    <Tag
      className={`font-extrabold inline-block bg-gradient-to-r from-[#50B848] to-[#009677] bg-clip-text ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default Heading;
