import React from 'react';
import classNames from 'classnames';

import * as styles from './index.module.scss';

interface RichLinkProps {
    className?: string;
    title: string;
    quote: string;
    image: string;
    href: string;
}

const RichLink: React.FC<RichLinkProps> = ({ className, title, quote, image, href }) => {
    return <a href={href} className={classNames(styles.richLink, className)}>
        <article>
            <div>
                <img src={image}/>
            </div>
            <div>
                <h1>{ title }</h1>
                <blockquote>{ quote }</blockquote>
            </div>
        </article>
    </a>
};

export default RichLink;
