import {
    folders
} from "./BucketView";

it("can render folders", () => {

    const prefixes = {
        "a": {
            "a/b": {
                "a/b/c": {}
            }
        }
    };

    expect(folders(prefixes)).toMatchSnapshot();

});
