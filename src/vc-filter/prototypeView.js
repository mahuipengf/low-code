import View from './view';
import PickableField from './PickableFieldView';
import './prototypeView.less';

const [
    Filter,
    Row,
    Action,
    Empty,
    Picker,
] = View;

class FusionFilter extends Filter {
  isViewMode() {
    return false;
  }
}

export default [
  FusionFilter,
  Row,
  Action,
  Empty,
  Picker,
  PickableField,
];