export default store => next => action => {
    console.log(action)
    if (!action.generateId) {
        next(action)
    }

    next({
        ...action,
        uniqId: (Date.now() + Math.random()).toString(),
    })
}
