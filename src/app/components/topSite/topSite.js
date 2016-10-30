import controller from './topSiteController';
import template from './topSite.html';
import './topSite.less';

const topSite = {
    bindings: {
        model: '<'
    },
    controller,
    template
};

export default topSite;
