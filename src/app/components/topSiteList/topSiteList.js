import controller from './topSiteListController';
import template from './topSiteList.html';
import './topSiteList.less';

const topSiteList = {
    bindings: {
        items: '<',
        onDragend: '&'
    },
    controller,
    template
};

export default topSiteList;
