import {
    reducer as bucket
} from "data/bucket";

test('reducers', () => {
    let state;
    state = bucket({bucket:{saved:false,baseURL:null,bucket:null,prefixes:{},content:[]}}, {type:'BUCKET/LIST-DIRS',data:{baseURL:'https://s3.eu-west-2.amazonaws.com',bucket:'imgs-yolo',prefixes:{content:{'content/':{}}}},meta:{origin:'middleware'}});

    expect(state).toMatchSnapshot();

});
