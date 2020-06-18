import React from 'react';
import { Result } from 'antd';

class Exception extends React.PureComponent {
    render() {
        return (
            <div>
                <Result
                    status="403"
                    title="403"
                    subTitle="你没有此页面的访问权限"
                    // extra={<Button type="primary">返回</Button>}
                />
            </div >
        );
    }
}

export default Exception;