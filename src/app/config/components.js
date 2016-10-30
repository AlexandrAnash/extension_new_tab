import newTab from 'components/newTab/newTab';
import search from 'components/search/search';
import menuList from 'components/menuList/menuList';
import menuItem from 'components/menuItem/menuItem';
import topSite from 'components/topSite/topSite';
import topSiteList from 'components/topSiteList/topSiteList';

export default function Components(app) {
    app.component('menuList', menuList);
    app.component('menuItem', menuItem);
    app.component('search', search);
    app.component('newTab', newTab);
    app.component('topSite', topSite);
    app.component('topSiteList', topSiteList);
}
