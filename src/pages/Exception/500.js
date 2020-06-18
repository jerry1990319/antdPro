import React from 'react';
import { Result } from 'antd';

class Exception extends React.PureComponent {
    render() {
        return (
            <div>
                <Result
                    status="500"
                    title="500"
                    subTitle="服务器出错啦！"
                    // extra={<Button type="primary">返回</Button>}
                />
            </div >
        );
    }
}

export default Exception;