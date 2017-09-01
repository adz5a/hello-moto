import React from 'react';
import { List } from "immutable";
import { 
    defaultBorderedInlineTable,
    hoverableInputStyle,
    inputStyle
} from "components/styles";
import { Close } from "components/icons";
import noop from "lodash/noop";


const Image = ({ image, onRemove = noop }) => (
    <li>
        <Close className="grow" onClick={() => onRemove(image.get("_id"))}/>
        <span className={defaultBorderedInlineTable}>
            {image.getIn(["data", "url"], "").slice(0, 15)}
        </span>
    </li>
);


const AddTagFromSelectionView = ({ tags = List() }) => {
    return (
        <form
            className="flex justify around ml1 mr1"
        >
            <input 
                type="submit"
                defaultValue="Add To All"
                className={hoverableInputStyle} />
            <select
            >
                {
                    tags
                        .map((tagName, i) => (
                            <option
                                key={i}
                            >{tagName}</option>
                        ))
                        .toArray()
                }
            </select>
        </form>
    );
};

const CreateTagView = ({ tags = List() }) => {
    return (
        <form
            className="flex justify around ml1 mr1"
        >
            <input 
                type="submit"
                defaultValue="Create Tag & Add"
                className={hoverableInputStyle} />
            <input 
                type="text"
                placeholder="a tag"
                className={inputStyle} />
        </form>
    );
};

export function MenuView ({
    images = List(),
    tags = List(),
    CreateTag = CreateTagView,
    AddTag = AddTagFromSelectionView
}) {

    return (
        <section>
            <h1 className="fa7">Selection</h1>
            <ul className="list pa0 flex flex-column">
                {
                    images
                        .map((imageDoc, i) => {

                            return (
                                <Image
                                    image={imageDoc}
                                    key={i}
                                />
                            );

                        })
                        .toArray()
                }
            </ul>
            <AddTag tags={tags}/>
            <CreateTag />
        </section>
    );

}
