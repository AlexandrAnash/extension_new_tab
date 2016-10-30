import controller from './searchController';
import template from './search.html';
import './search.less';

const search = {
    bindings: {
        model: '<'
    },
    controller,
    template
};

export default search;
