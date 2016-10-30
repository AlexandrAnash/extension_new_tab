const link = (scope, element, attrs) => {
    let isError = false;
    element.bind('error', () => {
        if (attrs.src !== attrs.onErrorSrc && !isError) {
            attrs.$set('src', attrs.onErrorSrc);
            isError = true;
        }
    });
};

export default () => ({
    link
});