import { FC } from "react";
import ContentLoader from "react-content-loader";

type OwnProps = {};

type Props = OwnProps;

const FormTemplateLoader: FC<Props> = () => {
  return (
    <ContentLoader
      speed={2}
      width="100%"
      height="500"
      backgroundColor="#e0e0e0"
      foregroundColor="#cecece"
    >
      <InputRect y="1" />
      <InputRect y="70" />
      <InputRect y="140" />
      <InputRect y="210" />
      <InputRect y="280" />
      <InputRect y="350" />
      <InputRect y="420" />
    </ContentLoader>
  );
};

const InputRect = ({ y }: { y: string }) => (
  <rect x="1" y={y} rx="5" ry="5" width="100%" height="50" />
);

export default FormTemplateLoader;
