import controller from './menuListController';
import template from './menuList.html';
import './menuList.less';

const menuList = {
    bindings: {
        items: '<'
    },
    controller,
    template
};

export default menuList;
