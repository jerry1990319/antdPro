import React from 'react';
import { Upload, Icon } from 'antd';
// import { ImgPrefix } from '@/services/api-utils';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

class Uploadel extends React.PureComponent {
    state = {
        loading: false,

    };
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };
    beforeUpload = (file) => {
        if (this.props.onBeforeUpload) {
            this.props.onBeforeUpload(file)
        }
    }
    render() {
        const { imageUrl } = this.state;
        const {memberPicurl,disabled}=this.props;
        console.log('memberPicurl', this.props.memberPicurl);
        const uploadButton = (
            <div>

                {
                    !memberPicurl ? (<div>
                        <Icon type={this.state.loading ? 'loading' : 'plus'} />
                        <div className="ant-upload-text">{this.props.text}</div>
                    </div>)
                        : null
                        // <img src={`${ImgPrefix}${memberPicurl}`} alt="" style={{ width: '5rem', height: '5rem' }} />
                }


            </div>
        );
        return (
            <div style={{ marginRight: "10px" }}>
                <Upload
                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}
                    disabled={disabled}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '5rem', height: '5rem' }} /> : uploadButton}
                </Upload>
            </div>
        );
    }
}

export default Uploadel;