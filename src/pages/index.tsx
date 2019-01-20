import React from 'react';
import classNames from 'classnames';

import MarbleBackground from '../components/MarbleBackground';
import * as styles from './index.module.scss';

export default () => {
    return (
        <div className={styles.page}>
            <MarbleBackground className={classNames(styles.background, styles.layer)} />
            <div className={styles.layer}>
                <h1>JongChan Choi</h1>
                <ul>
                    <li>
                        <a href="https://0xabcdef.com/resume/">resume</a>
                    </li>
                    <li>
                        <a href="https://github.com/disjukr">github</a>
                    </li>
                    <li>
                        <a href="https://twitter.com/disjukr">twitter</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};
