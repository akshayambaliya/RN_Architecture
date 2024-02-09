export function PROFILESCREEN_NAVIGATION(
    params
) {
    return (dispatch) =>
        dispatch({
            routeName: '',
            type: '',
            shouldNavigateOnPromiseRejection: '',
            preNavigationPromise: () => { },
            ...params,
        });
}