import bem from 'bem-cn-lite';

import './TestComponent.css';

const cn = bem('testcomponent');

export default function TestComponent(props) {
    return (
        <div className={cn()}>
            
        </div>
    );
}
