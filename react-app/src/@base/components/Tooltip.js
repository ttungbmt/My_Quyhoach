import React, {memo} from 'react'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import 'tippy.js/animations/scale.css';
import 'tippy.js/animations/scale-subtle.css';
import 'tippy.js/animations/scale-extreme.css';

function Tooltip({title, children, ...rest}){
    if(!title) return children

    const config = {
        theme: 'light',
        animation: 'scale',
        content: title,
        trigger: 'mouseenter',
        ...rest
    }

    return (
        <Tippy {...config}>
            {children}
        </Tippy>
    )
}

export default memo(Tooltip)