import PropTypes from "prop-types";

const Container = ({ children, className }) => {
  return <div className={`max-w-6xl mx-auto ${className}`}>{children}</div>;
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Container;
