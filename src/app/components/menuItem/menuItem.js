import controller from './menuItemController';
import template from './menuItem.html';
import './menuItem.less';

const menuItem = {
    bindings: {
        model: '<',
        onClick: '&'
    },
    controller,
    template
};

export default menuItem;
