export const defer = () => {

    const deferred = {};

    const promise = new Promise (( resolve, reject ) => {

        deferred.resolve = resolve;
        deferred.reject = reject;

    });

    deferred.promise = promise;

    return deferred;

};


export const after = (timeout = 1) => {

    const deferred = defer();

    setTimeout(deferred.resolve, timeout);


    return deferred.promise;

};
