import './heading.scss';

const Heading = ({ text, additionalClass }: { text: string; additionalClass?: string }) => {
  return <h2 className={`heading ${additionalClass}`}>{text}</h2>;
};

export default Heading;
