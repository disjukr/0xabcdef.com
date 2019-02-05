import React from 'react';
import classNames from 'classnames';

import { interleave } from '../../../util';
import * as styles from './index.module.scss';

interface SkillSetProps {
    className?: string;
    items: string[];
}
const SkillSet: React.FC<SkillSetProps> = ({ className, items }) => {
    return (
        <p className={classNames(styles.skillSet, className)}>
            {interleave(items.map(item => <code>{item}</code>), ' ')}
        </p>
    );
};

export default SkillSet;
