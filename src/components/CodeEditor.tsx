/* eslint-disable @typescript-eslint/ban-types */
import React from 'react'
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
    value?: string
    onChange?: (e:any)=>void
}

const CodeEditor = (props: Props) => {
    return (
        <AceEditor
            width='inherit'
            height="500px"
            mode="typescript"
            theme="monokai"
            fontSize={16}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            showGutter={false}
            showPrintMargin={false}
            style={{padding:'4px'}}
            value={props.value}
            onChange={props.onChange}


        />

    )
}


export default CodeEditor