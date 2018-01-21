"use strict";

import React, {PropTypes} from "react";

export default class LivePreviewComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: props.content
        }
    }

    componentDidUpdate() {
        const elements = document.getElementsByClassName("live-preview-component");
        if (!elements || !elements.length) {
            return;
        }
        for (let i = 0; i < elements.length; i++) {
            renderMathInElement(elements[i], {
                delimiters: [
                    {
                        left: "\\[",
                        right: "\\]",
                        display: true
                    }, {
                        left: "\\(",
                        right: "\\)",
                        display: false
                    }
                ]
            });
        }
    }

    render() {
        return (
            <div className="live-preview-component">
                {this.props.content}
            </div>
        );
    }
}
// const LivePreviewComponent = ({content}) => {
//     return (
//         <div>
//             {content}
//         </div>
//     );
// };

LivePreviewComponent.propTypes = {
    content: PropTypes.node
};

