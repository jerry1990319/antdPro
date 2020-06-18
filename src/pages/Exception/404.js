import React from 'react';
import { Result } from 'antd';

class Exception extends React.PureComponent {
    render() {
        return (
            <div>
                <Result
                    status="404"
                    title="404"
                    subTitle="此页面未找到"
                    // extra={<Button type="primary">返回</Button>}
                />
            </div >
        );
    }
}

export default Exception;