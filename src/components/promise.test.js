import { 
    defer,
    after
} from "./promise";


describe("components/promise", () => {

    test("basic", () => {

        const deferred = defer();

        setTimeout(() => deferred.resolve("yolo"), 20);


        return deferred
            .promise
            .then(v => expect(v).toBe("yolo"));


    });


    test("after", () => {

        const first = after(10)
            .then(() => "lol");
        const second = after(20)
            .then(() => "yolo");

        return Promise.race([second, first])
            .then(v => expect(v).toBe("lol"));

    } );


});
