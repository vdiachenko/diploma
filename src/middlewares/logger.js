export default store => next => action => {
    console.log('[ACTION]:', action)
    next(action)
}
