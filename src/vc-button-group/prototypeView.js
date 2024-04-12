import View from './view';
import './prototypeView.less';

const PrototypeView = (props) => {
  return <View {...props} isDesignMode />;
};

PrototypeView.displayName = 'ButtonGroup';

export default PrototypeView;
