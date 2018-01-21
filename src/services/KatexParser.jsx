"use strict";

import React from "react";
import HtmlToReact, {Parser} from "html-to-react";
import {InlineMath, BlockMath} from "react-katex";
import he from "he";

let processNodeDefinitions, processingInstructions, htmlToReactParser;
let init = false;

function initVariables() {
    processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
    processingInstructions = [
        {
            replaceChildren: true,
            shouldProcessNode: () => false,
            processNode: (node) => {
                if (node.attribs["data-block"]) {
                    return <BlockMath>{node.attribs["data-katex"]}</BlockMath>;
                }
                return <InlineMath>{node.attribs["data-katex"]}</InlineMath>;
            }
        },
        {
            shouldProcessNode: () => (true),
            processNode: processNodeDefinitions.processDefaultNode
        }
    ];
    htmlToReactParser = new Parser();
}

export function parseKatex(html) {
    if (!init) {
        init = true;
        initVariables();
    }
    let dom = he.decode(html);
    return htmlToReactParser.parseWithInstructions(dom, () => true, processingInstructions);
}

export function resetVariables() {
    processNodeDefinitions = processingInstructions = htmlToReactParser = null;
    init = false;
}
