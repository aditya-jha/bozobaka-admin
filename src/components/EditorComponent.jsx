"use strict";

import React, {PropTypes} from "react";
import ReactQuill from "react-quill";

// class EditorComponent extends React.Component {
//     static propTypes = {
//         content: PropTypes.string,
//         placeHolder: PropTypes.string,
//         onChange: PropTypes.func.isRequired,
//     };
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             value: props.content
//         };
//     }
//
//     onKeyUpHandler(event) {
//         this.props.onChange(event.target.value);
//     }
//
//     componentWillReceiveProps(nextProps) {
//         this.setState({
//             value: nextProps.content
//         });
//         if (nextProps.content && nextProps.content !== this.props.content) {
//             this.props.onChange(nextProps.content);
//         }
//     }
//
//     render() {
//         const { placeHolder } = this.props;
//         const style = {
//             width: "90%",
//             height: "150px"
//         };
//
//         return (
//             <textarea
//                 style={style}
//                 onChange={this.onKeyUpHandler.bind(this)}
//                 placeholder={placeHolder}
//                 value={this.state.value}>
//             </textarea>
//         );
//     }
// }
const EditorComponent = ({content, placeHolder, onChange, theme, modules}) => {
    theme = theme || "snow";
    const editorModule = modules ? EditorComponent[modules] : EditorComponent.defaultModules;
    return (
        <ReactQuill
            value={content}
            theme={theme}
            onChange={onChange.bind(this)}
            modules={editorModule}
            formats={EditorComponent.formats}
            placeholder={placeHolder}
        />
    );

};

/*
 * Quill modules to attach to editor
 * See http://quilljs.com/docs/modules/ for complete options
 */
EditorComponent.defaultModules = {
    toolbar: [
        [{header: [1, 2, false]}, {font: []}],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{list: "ordered"}, {list: "bullet"},
            {indent: "-1"}, {indent: "+1"}],
        ["link", "image", "video"],
        ["clean"]
    ]
};

EditorComponent.optionsModules = {
    toolbar: [
        [{header: [1, 2, false]}, {font: []}, "image"],
    ]
};

/*
 * Quill editor formats
 * See http://quilljs.com/docs/formats/
 */
EditorComponent.formats = [
    "header", "font", "size",
    "bold", "italic", "underline", "strike", "blockquote",
    "list", "bullet", "indent",
    "link", "image", "video"
];

/*
 * PropType validation
 */
// EditorComponent.prototype = {
//     content: PropTypes.string,
//     placeHolder: PropTypes.string,
//     onChange: PropTypes.func.isRequired,
//     modules: PropTypes.object
// };

export default EditorComponent;
