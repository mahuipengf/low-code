import View from './view';
import './prototypeView.less';

const [
    Filter,
] = View;

class FusionFilter extends Filter {
  isViewMode() {
    return false;
  }
}

export default [
  FusionFilter,
];